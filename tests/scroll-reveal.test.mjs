import test from 'node:test';
import assert from 'node:assert/strict';
import { observeScrollReveals, isInOpeningViewport } from '../src/scroll-reveal.js';

function element(top, extra = {}) {
  return {
    nodeType: 1, tagName: 'DIV', dataset: {}, isConnected: true,
    getBoundingClientRect: () => ({ top, bottom: top + 60, left: 20, right: 220, width: 200, height: 60 }),
    contains(target) { return target === this; },
    matches: () => true,
    querySelectorAll: () => [],
    getAttribute: () => null,
    ...extra,
  };
}

function browser(elements) {
  const root = new EventTarget();
  Object.assign(root, { documentElement: { clientWidth: 1000 }, body: {}, activeElement: null, querySelectorAll: () => elements });
  const environment = new EventTarget();
  const preference = new EventTarget();
  preference.matches = false;
  environment.innerHeight = 800;
  environment.matchMedia = () => preference;
  let intersection, mutation;
  environment.IntersectionObserver = class {
    constructor(callback) { intersection = callback; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  environment.MutationObserver = class {
    constructor(callback) { mutation = callback; }
    observe() {}
    disconnect() {}
  };
  const dispatch = (type, target) => {
    const event = new Event(type);
    Object.defineProperty(event, 'target', { value: target });
    root.dispatchEvent(event);
  };
  return {
    root, environment, preference, dispatch,
    intersect(target, isIntersecting = true) { intersection([{ target, isIntersecting }]); },
    insert(node) { mutation([{ addedNodes: [node] }]); },
  };
}

test('any opening-viewport overlap is immediate, while hidden and offscreen blocks wait', () => {
  const first = element(0), partial = element(799), later = element(900);
  const hidden = element(0, { getBoundingClientRect: () => ({ width: 0, height: 0 }) });
  const b = browser([first, partial, later, hidden]);
  const dispose = observeScrollReveals(b.root, b.environment);
  assert.equal(first.dataset.revealState, 'immediate');
  assert.equal(partial.dataset.revealState, 'immediate');
  assert.equal(later.dataset.revealState, 'pending');
  assert.equal(hidden.dataset.revealState, 'pending');
  b.intersect(later);
  assert.equal(later.dataset.revealState, 'visible');
  b.intersect(later, false);
  assert.equal(later.dataset.revealState, 'visible', 'scrolling away must not hide revealed content');
  dispose();
  b.intersect(later);
  assert.equal(later.dataset.revealState, undefined, 'queued callbacks after cleanup are ignored');
});

test('offscreen images wait for their pixels before starting a reveal', () => {
  const image = element(1200, { tagName: 'IMG', complete: false, getAttribute: () => '/assets/decision-tree.webp' });
  const b = browser([image]);
  const dispose = observeScrollReveals(b.root, b.environment);
  b.intersect(image);
  assert.equal(image.dataset.revealState, 'pending');
  image.complete = true;
  b.dispatch('load', image);
  assert.equal(image.dataset.revealState, 'visible');
  dispose();
});

test('lazy content participates, while keyboard-focused content is immediately visible', () => {
  const b = browser([]);
  const dispose = observeScrollReveals(b.root, b.environment);
  const card = element(100);
  b.insert(card);
  assert.equal(card.dataset.revealState, 'pending', 'new content was not in the opening viewport');
  b.intersect(card);
  assert.equal(card.dataset.revealState, 'visible');
  const linkedArtwork = element(1400);
  b.insert(linkedArtwork);
  b.dispatch('focusin', linkedArtwork);
  assert.equal(linkedArtwork.dataset.revealState, 'immediate');
  b.intersect(linkedArtwork);
  assert.equal(linkedArtwork.dataset.revealState, 'immediate', 'a queued intersection cannot fade focused content');
  dispose();
});

test('native scroll restoration exempts the restored opening viewport', () => {
  const block = element(1200);
  const b = browser([block]);
  const dispose = observeScrollReveals(b.root, b.environment);
  assert.equal(block.dataset.revealState, 'pending');
  block.getBoundingClientRect = element(100).getBoundingClientRect;
  b.environment.dispatchEvent(new Event('pageshow'));
  b.intersect(block);
  assert.equal(block.dataset.revealState, 'immediate');
  dispose();
});

test('live reduced-motion changes reveal existing and future content without animation', () => {
  const later = element(1200);
  const b = browser([later]);
  const dispose = observeScrollReveals(b.root, b.environment);
  const event = new Event('change');
  event.matches = true;
  b.preference.dispatchEvent(event);
  assert.equal(later.dataset.revealState, 'immediate');
  const card = element(1400);
  b.insert(card);
  assert.equal(card.dataset.revealState, 'immediate');
  b.intersect(later);
  assert.equal(later.dataset.revealState, 'immediate');
  dispose();
});

test('print, no-observer, and initial reduced-motion cases keep content visible', () => {
  const later = element(1200);
  const b = browser([later]);
  const dispose = observeScrollReveals(b.root, b.environment);
  b.environment.dispatchEvent(new Event('beforeprint'));
  assert.equal(later.dataset.revealState, 'immediate');
  dispose();
  delete b.environment.IntersectionObserver;
  observeScrollReveals(b.root, b.environment)();
  assert.equal(later.dataset.revealState, undefined);
  const reduced = browser([later]);
  reduced.preference.matches = true;
  observeScrollReveals(reduced.root, reduced.environment)();
  assert.equal(later.dataset.revealState, undefined);
  assert.equal(isInOpeningViewport({ top: -20, bottom: 0, left: 0, right: 20, width: 20, height: 20 }, { width: 1000, height: 800 }), false);
});

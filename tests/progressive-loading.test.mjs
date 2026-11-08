import test from 'node:test';
import assert from 'node:assert/strict';
import { observeNearViewport } from '../src/observe-near-viewport.js';

function browser() {
  const environment = new EventTarget();
  const link = new EventTarget();
  const image = { closest: selector => selector === 'a' ? link : null };
  const observers = [];
  environment.IntersectionObserver = class {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnected = false;
      observers.push(this);
    }
    observe(target) { this.target = target; }
    disconnect() { this.disconnected = true; }
    intersect(isIntersecting) { this.callback([{ target: this.target, isIntersecting }]); }
  };
  return { environment, link, image, observers };
}

test('offscreen images wait until approaching the viewport and load only once', () => {
  const { environment, image, observers } = browser();
  let loads = 0;
  observeNearViewport(image, () => loads++, environment);
  const [observer] = observers;
  assert.equal(observer.target, image);
  assert.equal(observer.options.rootMargin, '300px 0px');
  observer.intersect(false);
  assert.equal(loads, 0);
  observer.intersect(true);
  observer.intersect(true);
  environment.dispatchEvent(new Event('beforeprint'));
  assert.equal(loads, 1);
  assert.equal(observer.disconnected, true);
});

test('keyboard focus loads linked artwork before it is visible', () => {
  const { environment, image, link, observers } = browser();
  const loads = [];
  observeNearViewport(image, printing => loads.push(printing), environment);
  link.dispatchEvent(new Event('focus'));
  assert.deepEqual(loads, [false]);
  assert.equal(observers[0].disconnected, true);
});

test('printing requests pending artwork synchronously', () => {
  const { environment, image, observers } = browser();
  const loads = [];
  observeNearViewport(image, printing => loads.push(printing), environment);
  environment.dispatchEvent(new Event('beforeprint'));
  assert.deepEqual(loads, [true]);
  assert.equal(observers[0].disconnected, true);
});

test('browsers without IntersectionObserver load artwork immediately', () => {
  const { environment, image } = browser();
  delete environment.IntersectionObserver;
  let loads = 0;
  observeNearViewport(image, () => loads++, environment);
  assert.equal(loads, 1);
});

test('unmount cancels pending callbacks and detaches focus and print listeners', () => {
  const { environment, image, link, observers } = browser();
  let loads = 0;
  const dispose = observeNearViewport(image, () => loads++, environment);
  dispose();
  observers[0].intersect(true);
  link.dispatchEvent(new Event('focus'));
  environment.dispatchEvent(new Event('beforeprint'));
  assert.equal(loads, 0);
  assert.equal(observers[0].disconnected, true);

  // React StrictMode must be able to subscribe again after its initial cleanup.
  observeNearViewport(image, () => loads++, environment);
  observers[1].intersect(true);
  assert.equal(loads, 1);
});

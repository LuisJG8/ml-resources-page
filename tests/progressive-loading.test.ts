import test from 'node:test';
import assert from 'node:assert/strict';
import type { LoadingEnvironment } from '../src/observe-near-viewport.ts';
import { observeNearViewport } from '../src/observe-near-viewport.ts';

function browser() {
  type Entry = { target: HTMLElement; isIntersecting: boolean };
  type Callback = (entries: Entry[]) => void;
  const link = new EventTarget();
  const image = { closest: (selector: string) => selector === 'a' ? link : null };
  const observers: MockIntersectionObserver[] = [];
  class MockIntersectionObserver {
    callback: Callback;
    options: IntersectionObserverInit;
    disconnected = false;
    target: HTMLElement | undefined;
    constructor(callback: Callback, options: IntersectionObserverInit) {
      this.callback = callback;
      this.options = options;
      observers.push(this);
    }
    observe(target: HTMLElement) { this.target = target; }
    disconnect() { this.disconnected = true; }
    intersect(isIntersecting: boolean) {
      if (!this.target) throw new Error('Observer has no target');
      this.callback([{ target: this.target, isIntersecting }]);
    }
  }
  const environment = Object.assign(new EventTarget(), {
    IntersectionObserver: MockIntersectionObserver,
  });
  // These small test doubles intentionally implement only the DOM surface used
  // by the loader; keep the boundary assertions inside the fixture factory.
  return {
    environment: environment as unknown as LoadingEnvironment & EventTarget,
    link, image: image as unknown as HTMLElement, observers,
  };
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
  const loads: boolean[] = [];
  observeNearViewport(image, printing => loads.push(printing), environment);
  link.dispatchEvent(new Event('focus'));
  assert.deepEqual(loads, [false]);
  assert.equal(observers[0].disconnected, true);
});

test('printing requests pending artwork synchronously', () => {
  const { environment, image, observers } = browser();
  const loads: boolean[] = [];
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

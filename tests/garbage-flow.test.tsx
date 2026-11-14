import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { GarbageFlow } from '../src/GarbageFlow.tsx';

let top = 900;
let reduced = false;
let preferenceChanged: (() => void) | undefined;
let nextFrame = 0;
const frames = new Map<number, FrameRequestCallback>();
const cancelFrame = vi.fn((id: number) => frames.delete(id));

beforeEach(() => {
  top = 900;
  reduced = false;
  preferenceChanged = undefined;
  frames.clear();
  cancelFrame.mockClear();
  vi.stubGlobal('innerHeight', 1000);
  vi.stubGlobal('matchMedia', () => ({
    get matches() { return reduced; },
    addEventListener(_event: string, listener: () => void) { preferenceChanged = listener; },
    removeEventListener() { preferenceChanged = undefined; },
  }));
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  vi.stubGlobal('cancelAnimationFrame', cancelFrame);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    top, bottom: top + 64, left: 0, right: 300, width: 300, height: 64, x: 0, y: top, toJSON() {},
  }));
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function scrollTo(position: number) {
  act(() => {
    top = position;
    window.dispatchEvent(new Event('scroll'));
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback(0));
  });
}

it('moves garbage through the robot as the user scrolls and reverses when scrolling back', () => {
  render(<GarbageFlow />);
  const illustration = screen.getByRole('img', { name: /Garbage in, garbage out/ });
  const progress = () => illustration.style.getPropertyValue('--garbage-progress');
  expect(progress()).toBe('0');
  scrollTo(600);
  expect(progress()).toBe('0.5');
  scrollTo(200);
  expect(progress()).toBe('1');
  scrollTo(1000);
  expect(progress()).toBe('0');
});

it('shows a static sequence for reduced motion and responds to live preference changes', () => {
  reduced = true;
  render(<GarbageFlow />);
  const illustration = screen.getByRole('img');
  expect(illustration.dataset.motion).toBe('reduced');
  scrollTo(600);
  expect(illustration.style.getPropertyValue('--garbage-progress')).toBe('');
  act(() => { reduced = false; preferenceChanged?.(); });
  expect(illustration.dataset.motion).toBe('scroll');
  expect(illustration.style.getPropertyValue('--garbage-progress')).toBe('0.5');
  act(() => { reduced = true; preferenceChanged?.(); });
  expect(illustration.dataset.motion).toBe('reduced');
});

it('coalesces scroll updates and cancels pending work on unmount', () => {
  const view = render(<GarbageFlow />);
  act(() => {
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));
  });
  expect(frames.size).toBe(1);
  view.unmount();
  expect(frames.size).toBe(0);
  expect(cancelFrame).toHaveBeenCalledOnce();
  window.dispatchEvent(new Event('scroll'));
  expect(frames.size).toBe(0);
});

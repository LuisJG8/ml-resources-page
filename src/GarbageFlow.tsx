import { useLayoutEffect, useRef } from 'react';
import './garbage-flow.css';

export function GarbageFlow() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;
    const update = () => {
      frame = null;
      element.dataset.motion = preference.matches ? 'reduced' : 'scroll';
      if (preference.matches) return;
      // Travel while the illustration moves from the lower viewport toward its center.
      const top = element.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .85 - top) / (window.innerHeight * .5)));
      element.style.setProperty('--garbage-progress', String(progress));
    };
    const schedule = () => {
      if (!preference.matches && frame === null) frame = window.requestAnimationFrame(update);
    };
    const changePreference = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      update();
    };
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    resize?.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', changePreference);
    update();
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', changePreference);
      resize?.disconnect();
    };
  }, []);

  return <div ref={ref} className="garbage-flow" data-reveal="" role="img" aria-label="Garbage in, garbage out: dirty data enters a model and comes out as dirty results.">
    <span className="garbage-flow__garbage" aria-hidden="true">🗑️</span>
    <span className="garbage-flow__robot" aria-hidden="true">🤖</span>
    <span className="garbage-flow__static-output" aria-hidden="true">🗑️</span>
  </div>;
}

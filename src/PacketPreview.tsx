import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { PacketSample, PreviewPosition } from './packet-samples.ts';
import { createPortal } from 'react-dom';
import { packetPreviewPosition } from './packet-samples.ts';
import './packet-preview.css';

interface PacketPreviewProps { anchor: HTMLButtonElement; sample: PacketSample; onClose: () => void }
type PreviewStyle = CSSProperties & { '--packet-tail-x': string };

export function PacketPreview({ anchor, sample, onClose }: PacketPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PreviewPosition | null>(null);

  useLayoutEffect(() => {
    const bubble = ref.current;
    if (!bubble) return;
    const openingScrollY = window.scrollY;
    const updatePosition = () => {
      setPosition(packetPreviewPosition(anchor.getBoundingClientRect(), bubble.getBoundingClientRect(), {
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
      }));
    };
    const outside = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!bubble.contains(target) && !(target instanceof Element && target.closest('.packet-trigger'))) onClose();
    };
    const scroll = () => {
      const icon = anchor.getBoundingClientRect();
      if (Math.abs(window.scrollY - openingScrollY) >= 160 || icon.bottom <= 0 || icon.top >= window.innerHeight) {
        onClose();
        return;
      }
      updatePosition();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        anchor.focus({ preventScroll: true });
      }
    };
    // Close when switching between desktop and compact rails; the old trigger
    // is hidden then, so it can no longer anchor a visible preview.
    const layout = window.matchMedia('(min-width: 1024px)');
    const resize = new ResizeObserver(updatePosition);
    resize.observe(bubble);
    resize.observe(anchor);
    updatePosition();
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('focusin', outside);
    document.addEventListener('keydown', escape);
    window.addEventListener('scroll', scroll, { capture: true, passive: true });
    window.addEventListener('resize', updatePosition);
    layout.addEventListener('change', onClose);
    return () => {
      resize.disconnect();
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('focusin', outside);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('scroll', scroll, true);
      window.removeEventListener('resize', updatePosition);
      layout.removeEventListener('change', onClose);
    };
  }, [anchor, onClose]);

  const positioned = position !== null;
  useLayoutEffect(() => {
    if (positioned) ref.current?.focus({ preventScroll: true });
  }, [anchor, positioned]);

  function close() {
    onClose();
    anchor.focus({ preventScroll: true });
  }

  const style: PreviewStyle = { left: position?.left, top: position?.top, visibility: position ? 'visible' : 'hidden', '--packet-tail-x': `${position?.tail ?? 10}px` };

  return createPortal(<div
    ref={ref}
    id="packet-preview"
    className="packet-preview"
    data-reveal=""
    data-tail-edge={position?.edge}
    role="dialog"
    aria-modal="false"
    aria-label={`${sample.title} preview`}
    tabIndex={-1}
    style={style}
  >
    <button type="button" className="packet-preview-close" aria-label="Close data preview" onClick={close}>×</button>
    <table aria-label={sample.title}>
      <thead><tr>{sample.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>{sample.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>, document.body);
}

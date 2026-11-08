import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { packetPreviewPosition } from './packet-samples.js';
import './packet-preview.css';

export function PacketPreview({ anchor, sample, onClose }) {
  const ref = useRef(null);
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    const bubble = ref.current;
    const openingScrollY = window.scrollY;
    const updatePosition = () => {
      setPosition(packetPreviewPosition(anchor.getBoundingClientRect(), bubble.getBoundingClientRect(), {
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
      }));
    };
    const outside = event => {
      if (!bubble.contains(event.target) && !event.target.closest?.('.packet-trigger')) onClose();
    };
    const scroll = () => {
      const icon = anchor.getBoundingClientRect();
      if (Math.abs(window.scrollY - openingScrollY) >= 160 || icon.bottom <= 0 || icon.top >= window.innerHeight) {
        onClose();
        return;
      }
      updatePosition();
    };
    const escape = event => {
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
    if (positioned) ref.current.focus({ preventScroll: true });
  }, [anchor, positioned]);

  function close() {
    onClose();
    anchor.focus({ preventScroll: true });
  }

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
    style={{ left: position?.left, top: position?.top, visibility: position ? 'visible' : 'hidden', '--packet-tail-x': `${position?.tail ?? 10}px` }}
  >
    <button type="button" className="packet-preview-close" aria-label="Close data preview" onClick={close}>×</button>
    <table aria-label={sample.title}>
      <thead><tr>{sample.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>{sample.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>, document.body);
}

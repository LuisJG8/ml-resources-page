import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { observeNearViewport } from './observe-near-viewport.js';

export function ProgressiveImage({ src, width, height, style, ...props }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => observeNearViewport(ref.current, printing => {
    // Commit image sources before the browser captures the print document.
    if (printing) flushSync(() => setReady(true));
    else setReady(true);
  }), []);

  return <img
    data-reveal=""
    {...props}
    ref={ref}
    src={ready ? src : undefined}
    data-image-pending={ready ? undefined : ''}
    width={width}
    height={height}
    style={{ aspectRatio: `${width} / ${height}`, ...style }}
    decoding="async"
  />;
}

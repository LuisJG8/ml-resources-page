import { useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { flushSync } from 'react-dom';
import { observeNearViewport } from './observe-near-viewport.ts';

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number | string;
  height: number | string;
}

export function ProgressiveImage({ src, width, height, style, ...props }: ProgressiveImageProps) {
  const ref = useRef<HTMLImageElement>(null);
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

import type { CSSProperties } from 'react';
import { PIPE_CUTS } from './pipe-geometry.ts';
import { PipeArtwork } from './PipeArtwork.tsx';

// Stretch only a one-pixel row of straight glass at each cut. All curves,
// couplings, and pipe widths retain their original raster pixels.
export function ExtendedPipe() {
  const offset = (index: number) => PIPE_CUTS.slice(0, index).map((_, i) => `var(--pipe-extra-${i}) * 1px`).join(' + ') || '0px';
  const bounds = [0, ...PIPE_CUTS, 1672];
  const artwork = (style: CSSProperties) => <PipeArtwork style={style} />;
  return <div className="glass-shell">
    {bounds.slice(0, -1).map((start, index) => <div key={`slice-${start}`} className="pipe-slice" data-reveal="" style={{ top: `calc(${start}px + ${offset(index)})`, height: bounds[index + 1] - start }}>
      {artwork({ top: -start })}
    </div>)}
    {PIPE_CUTS.map((cut, index) => <div key={`extension-${cut}`} className="pipe-slice" data-reveal="" style={{ top: `calc(${cut}px + ${offset(index)})`, height: `calc(var(--pipe-extra-${index}) * 1px)` }}>
      {artwork({ top: `calc(-${cut}px * var(--pipe-extra-${index}))`, transform: `scaleY(var(--pipe-extra-${index}))`, transformOrigin: 'top left' })}
    </div>)}
  </div>;
}

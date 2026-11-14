import type { CSSProperties } from 'react';
import { PIPE_CUTS, PIPE_ENTRY_CROP, croppedY } from './pipe-geometry.ts';
import { PipeArtwork } from './PipeArtwork.tsx';

// Crop the entry and replace its lower collar with a plain glass row.
// All bends, remaining collars, and tube widths retain their raster pixels.
export function ExtendedPipe() {
  const offset = (index: number) => PIPE_CUTS.slice(0, index).map((_, i) => `var(--pipe-extra-${i}) * 1px`).join(' + ') || '0px';
  const bounds = [0, ...PIPE_CUTS, 1672];
  const slices = [
    { start: 0, end: PIPE_ENTRY_CROP[0], index: 0 },
    { start: PIPE_ENTRY_CROP[1], end: 286, index: 0 },
    ...bounds.slice(1, -1).map((start, index) => ({ start, end: bounds[index + 2], index: index + 1 })),
  ];
  const artwork = (style: CSSProperties) => <PipeArtwork style={style} />;
  return <div className="glass-shell">
    {slices.map(({ start, end, index }) => <div key={`slice-${start}`} className="pipe-slice" data-reveal="" style={{ top: `calc(${croppedY(start)}px + ${offset(index)})`, height: end - start }}>
      {artwork({ top: -start })}
    </div>)}
    <div className="pipe-slice" data-reveal="" style={{ top: croppedY(286), height: 34 }}>
      {artwork({ top: -280 * 34, transform: 'scaleY(34)', transformOrigin: 'top left' })}
    </div>
    {PIPE_CUTS.map((cut, index) => <div key={`extension-${cut}`} className="pipe-slice" data-reveal="" style={{ top: `calc(${croppedY(cut)}px + ${offset(index)})`, height: `calc(var(--pipe-extra-${index}) * 1px)` }}>
      {artwork({ top: `calc(-${cut}px * var(--pipe-extra-${index}))`, transform: `scaleY(var(--pipe-extra-${index}))`, transformOrigin: 'top left' })}
    </div>)}
  </div>;
}

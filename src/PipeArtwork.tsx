import type { ImgHTMLAttributes } from 'react';

// <picture> switches assets during live resizing without downloading the
// desktop texture on compact layouts. Keep all native crop coordinates intact.
const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export function PipeArtwork(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <picture>
    <source media="(min-width: 1024px)" srcSet="/assets/glass-pipeline.webp" />
    <img {...props} src={EMPTY_IMAGE} alt="" width="941" height="1672" decoding="async" draggable="false" />
  </picture>;
}

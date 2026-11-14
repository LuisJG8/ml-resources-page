import type { StageId } from './stage-pages.ts';
import { stagePages } from './stage-pages.ts';

export function StageDescription({ stageId, className = 'station-intro' }: { stageId: StageId; className?: string }) {
  const stage = stagePages.find(item => item.id === stageId);
  if (!stage) return null;
  return <>{stage.summary.split('\n\n').map(paragraph => <p key={paragraph} className={className} data-reveal="">{paragraph}</p>)}</>;
}

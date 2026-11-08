import type { StageId } from './stage-pages.ts';
import { stagePages } from './stage-pages.ts';

export function StageDescription({ stageId, className = 'station-intro' }: { stageId: StageId; className?: string }) {
  const stage = stagePages.find(item => item.id === stageId);
  if (!stage) return null;
  return <p className={className} data-reveal="">{stage.summary}</p>;
}

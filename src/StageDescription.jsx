import { stagePages } from './stage-pages.js';

export function StageDescription({ stageId, className = 'station-intro' }) {
  const stage = stagePages.find(item => item.id === stageId);
  return <p className={className} data-reveal="">{stage.summary}</p>;
}

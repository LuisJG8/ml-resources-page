import { stagePages } from './stage-pages.js';

export function StageHeadingLink({ stageId }) {
  return <span>{stagePages.find(stage => stage.id === stageId).title}</span>;
}

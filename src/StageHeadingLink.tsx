import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import type { StageId } from './stage-pages.ts';
import { stagePages } from './stage-pages.ts';
import './stage-pages.css';

export function StageHeadingLink({ stageId }: { stageId: StageId }) {
  const stage = stagePages.find(item => item.id === stageId);
  if (!stage) return null;
  return <a className="stage-heading-link" href={stage.path}>
    {stage.title}<ArrowUpRight aria-hidden="true" />
  </a>;
}

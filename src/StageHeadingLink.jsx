import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { stagePages } from './stage-pages.js';
import './stage-pages.css';

export function StageHeadingLink({ stageId }) {
  const stage = stagePages.find(item => item.id === stageId);
  return <a className="stage-heading-link" href={stage.path}>
    {stage.title}<ArrowUpRight aria-hidden="true" />
  </a>;
}

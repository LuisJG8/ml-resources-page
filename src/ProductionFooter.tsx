import './production-footer.css';
import { StageHeadingLink } from './StageHeadingLink.tsx';
import { StageDescription } from './StageDescription.tsx';
import { resourceLibraryHref } from './resource-library-state.ts';

export function ProductionFooter() {
  return <section id="production" className="production-footer" aria-labelledby="production-title">
    <div className="production-copy">
      <h2 id="production-title" data-reveal=""><StageHeadingLink stageId="production" /></h2>
      <StageDescription stageId="production" className="production-intro" />
      <a className="more-link" data-reveal="" href={resourceLibraryHref()}>Browse all resources →</a>
    </div>
  </section>;
}

import './production-footer.css';
import { StageHeadingLink } from './StageHeadingLink.tsx';
import { StageDescription } from './StageDescription.tsx';
import { ProgressiveImage } from './ProgressiveImage.tsx';
import { resourceLibraryHref } from './resource-library-state.ts';

export function ProductionFooter() {
  return <section id="production" className="production-footer" aria-labelledby="production-title">
    <div className="production-copy">
      <h2 id="production-title" data-reveal=""><StageHeadingLink stageId="production" /></h2>
      <StageDescription stageId="production" className="production-intro" />
      <ProgressiveImage className="production-tracking-image" src="/assets/mlflow-tracking.webp" alt="MLflow Tracking interface listing experiment models with their status, source runs, datasets, and accuracy metrics." width={1400} height={703} />
      <a className="more-link" data-reveal="" href={resourceLibraryHref()}>Browse all resources →</a>
    </div>
  </section>;
}

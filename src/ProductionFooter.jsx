import './production-footer.css';
import { StageHeadingLink } from './StageHeadingLink.jsx';
import { StageDescription } from './StageDescription.jsx';

export function ProductionFooter() {
  return <section id="production" className="production-footer" aria-labelledby="production-title">
    <div className="production-copy">
      <h2 id="production-title" data-reveal=""><span>04 /</span> <StageHeadingLink stageId="production" /></h2>
      <StageDescription stageId="production" className="production-intro" />
      <a className="more-link" data-reveal="" href={'https://scikit-learn.org/stable/model_persistence.html'}>Explore production resources →</a>
    </div>
  </section>;
}

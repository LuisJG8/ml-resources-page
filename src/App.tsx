import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { DatabaseStackIcon } from './DatabaseStackIcon.tsx';
import { Pipeline } from './Pipeline.tsx';
import { ProductionFooter } from './ProductionFooter.tsx';
import { LearningViewport } from './LearningViewport.tsx';
import { getStagePage } from './stage-pages.ts';
import { StageHeadingLink } from './StageHeadingLink.tsx';
import { StageDescription } from './StageDescription.tsx';
import { ProgressiveImage } from './ProgressiveImage.tsx';
import { useScrollReveal } from './useScrollReveal.ts';
import { SqlEditor } from './SqlEditor.tsx';
import { CustomerDataCleaning } from './CustomerDataCleaning.tsx';
import { isResourcesPath, resourceLibraryHref } from './resource-library-state.ts';
import './pipeline-introduction.css';
import './homepage-resources.css';

const StagePage = lazy(() => import('./StagePage.tsx').then(module => ({ default: module.StagePage })));
const ResourcesPage = lazy(() => import('./ResourcesPage.tsx'));

export function App() {
  const stage = getStagePage(window.location.pathname);
  if (isResourcesPath(window.location.pathname)) {
    return <Suspense fallback={<main className="detail-page"><a href="/">Back to the learning path</a><p role="status">Loading resources…</p></main>}><ResourcesPage /></Suspense>;
  }
  return stage ? <Suspense fallback={<main className="detail-page"><a href="/">Back to the learning path</a><p role="status">Loading study page…</p></main>}><StagePage stage={stage} /></Suspense> : <LearningPath />;
}

function LearningPath() {
  useScrollReveal();
  const [flowPaused, setFlowPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectMotionPreference = (event: MediaQueryListEvent) => setFlowPaused(event.matches);
    preference.addEventListener('change', respectMotionPreference);
    return () => preference.removeEventListener('change', respectMotionPreference);
  }, []);

  return <>
    <a className="skip-link" href="#data-sourcing">Skip to the learning path</a>
    <LearningViewport><div className="page" id="top">
      <Pipeline paused={flowPaused} />
      <main aria-label="Classical machine learning resources">
        <header className="pipeline-introduction">
          <h1 data-reveal="">The <span>ML pipeline</span></h1>
        </header>
        <section className="station foundations" id="data-sourcing" aria-labelledby="data-sourcing-title">
          <h2 id="data-sourcing-title" data-reveal=""><StageHeadingLink stageId="data-sourcing" /></h2>
          <StageDescription stageId="data-sourcing" />
          <div className="sourcing-query">
            <SqlEditor />
            <span className="sourcing-query-arrow" data-reveal="" aria-hidden="true"><ArrowRight weight="light" /></span>
            <div className="sourcing-database" data-reveal="" role="img" aria-label="Database queried by the SQL code"><DatabaseStackIcon /></div>
          </div>
        </section>

        <section className="station models" id="data-cleaning" aria-labelledby="data-cleaning-title">
          <h2 id="data-cleaning-title" data-reveal=""><StageHeadingLink stageId="data-cleaning" /></h2>
          <StageDescription stageId="data-cleaning" />
          <div className="station-content">
            <CustomerDataCleaning />
          </div>
        </section>

        <section className="station practice" id="modeling" aria-labelledby="modeling-title">
          <h2 id="modeling-title" data-reveal=""><StageHeadingLink stageId="modeling" /></h2>
          <StageDescription stageId="modeling" />
          <div className="modeling-logos">
            <ProgressiveImage src="/assets/xgboost-logo.webp" alt="XGBoost" width={408} height={138} />
            <ProgressiveImage src="/assets/lightgbm-logo.svg" alt="LightGBM" width={4672} height={1058} />
          </div>
        </section>
      </main>
    </div></LearningViewport>

    <ProductionFooter />
    <section id="resources" className="homepage-resources" aria-labelledby="resources-title">
      <h2 id="resources-title" data-reveal=""><a className="stage-heading-link" href={resourceLibraryHref()}>Resources<ArrowUpRight aria-hidden="true" /></a></h2>
    </section>
  </>;
}

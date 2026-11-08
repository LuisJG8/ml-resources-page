import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Database } from '@phosphor-icons/react/dist/csr/Database';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { Pipeline } from './Pipeline.jsx';
import { ProductionFooter } from './ProductionFooter.jsx';
import { LearningViewport } from './LearningViewport.jsx';
import { resources } from './resources.js';
import { getStagePage } from './stage-pages.js';
import { StageHeadingLink } from './StageHeadingLink.jsx';
import { StageDescription } from './StageDescription.jsx';
import { useScrollReveal } from './useScrollReveal.js';
import { ProgressiveImage } from './ProgressiveImage.jsx';
import { SqlEditor } from './SqlEditor.jsx';
import './pipeline-introduction.css';

const StagePage = lazy(() => import('./StagePage.jsx').then(module => ({ default: module.StagePage })));

function ResourceLink({ id }) {
  const resource = resources.find(item => item.id === id);
  const featuredCopy = {
    isl: 'A practical introduction to the core ideas and models in machine learning.',
    google: 'Learn core ML concepts with clear lessons, visual examples, and hands-on exercises.',
  };
  return <a className="resource-link" data-reveal="" href={resource.url} target="_blank" rel="noopener noreferrer">
    <span className="resource-title"><span>{resource.title}{resource.subtitle && <> <span className="resource-dash">—</span> {resource.subtitle}</>}</span><ArrowUpRight aria-hidden="true" weight="regular" /></span>
    <span className="resource-description">{featuredCopy[id] || resource.description}</span>
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
}

export function App() {
  const stage = getStagePage(window.location.pathname);
  return stage ? <Suspense fallback={<main className="detail-page"><a href="/">Back to the learning path</a><p role="status">Loading study page…</p></main>}><StagePage stage={stage} /></Suspense> : <LearningPath />;
}

function LearningPath() {
  useScrollReveal();
  const [flowPaused, setFlowPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectMotionPreference = event => setFlowPaused(event.matches);
    preference.addEventListener('change', respectMotionPreference);
    return () => preference.removeEventListener('change', respectMotionPreference);
  }, []);

  return <>
    <a className="skip-link" href="#data-sourcing">Skip to the learning path</a>
    <LearningViewport><div className="page" id="top">
      <Pipeline paused={flowPaused} />
      <main aria-label="Classical machine learning resources">
        <header className="pipeline-introduction">
          <h1 data-reveal="">the <span>machine learning pipeline</span></h1>
        </header>
        <section className="station foundations" id="data-sourcing" aria-labelledby="data-sourcing-title">
          <h2 id="data-sourcing-title" data-reveal=""><span>01 /</span> <StageHeadingLink stageId="data-sourcing" /></h2>
          <StageDescription stageId="data-sourcing" />
          <div className="sourcing-query">
            <SqlEditor />
            <span className="sourcing-query-arrow" data-reveal="" aria-hidden="true"><ArrowRight weight="light" /></span>
            <div className="sourcing-database" data-reveal="" role="img" aria-label="Database queried by the SQL code"><Database weight="duotone" aria-hidden="true" /></div>
          </div>
        </section>

        <section className="station models" id="data-cleaning" aria-labelledby="data-cleaning-title">
          <h2 id="data-cleaning-title" data-reveal=""><span>02 /</span> <StageHeadingLink stageId="data-cleaning" /></h2>
          <StageDescription stageId="data-cleaning" />
          <div className="station-content">
            <a data-reveal="" className="sklearn-art" href="https://scikit-learn.org/stable/" target="_blank" rel="noopener noreferrer" aria-label="Visit scikit-learn (opens in a new tab)"><ProgressiveImage data-reveal={undefined} src="/assets/scikit-learn.svg" width="232" height="124" alt="scikit-learn" /></a>
            <div className="resource-list"><ResourceLink id="pandas" /><ResourceLink id="preprocessing" /></div>
          </div>
        </section>

        <section className="station practice" id="modeling" aria-labelledby="modeling-title">
          <h2 id="modeling-title" data-reveal=""><span>03 /</span> <StageHeadingLink stageId="modeling" /></h2>
          <StageDescription stageId="modeling" />
          <div className="station-content">
            <ProgressiveImage className="learning-art tree-art" src="/assets/decision-tree.webp" alt="A decision tree with two branching levels and four prediction leaves labeled zero and one." width="1430" height="1100" />
            <div className="resource-list"><ResourceLink id="sklearn" /><a className="more-link" data-reveal="" href={'https://scikit-learn.org/stable/getting_started.html'}>Explore models & evaluation <ArrowRight aria-hidden="true" /></a></div>
          </div>
        </section>
      </main>
    </div></LearningViewport>

    <ProductionFooter />
  </>;
}

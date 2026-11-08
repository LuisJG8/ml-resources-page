import { useEffect } from 'react';
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { stagePages } from './stage-pages.js';
import { resources } from './resources.js';
import './stage-pages.css';
import { useScrollReveal } from './useScrollReveal.js';

export function StagePage({ stage }) {
  useScrollReveal();
  const index = stagePages.indexOf(stage);
  const previous = stagePages[index - 1];
  const next = stagePages[index + 1];
  const stageResources = stage.resourceIds.map(id => resources.find(resource => resource.id === id));

  useEffect(() => {
    document.title = `${stage.title} — Pipeline`;
    document.querySelector('meta[name="description"]').content = stage.summary;
  }, [stage]);

  return <>
    <a className="skip-link" href="#stage-study">Skip to what to study</a>
    <main className="detail-page">
      <a data-reveal="" className="detail-back" href={`/#${stage.id}`}><ArrowLeft aria-hidden="true" /> Back to the learning path</a>

      <div className={`detail-hero${stage.art ? '' : ' detail-hero--text'}`}>
        <div>
          <p data-reveal="" className="detail-kicker">STAGE {stage.number} / 04</p>
          <h1 data-reveal="">{stage.title}</h1>
          <p data-reveal="" className="detail-summary">{stage.summary}</p>
        </div>
        {stage.art && <img data-reveal="" className="detail-art" src={stage.art} alt={stage.artAlt} width={stage.artWidth} height={stage.artHeight} decoding="async" />}
      </div>

      <div className="detail-content">
        <div>
          <section id="stage-study" aria-labelledby="study-title">
            <h2 data-reveal="" id="study-title" className="detail-section-title">What to study</h2>
            <ol className="detail-topics">
              {stage.topics.map((topic, topicIndex) => <li data-reveal="" key={topic.title}>
                <span className="detail-topic-number" aria-hidden="true">{String(topicIndex + 1).padStart(2, '0')}</span>
                <div><h3>{topic.title}</h3><p>{topic.text}</p></div>
              </li>)}
            </ol>
          </section>
          <section data-reveal="" className="detail-practice" aria-labelledby="practice-title">
            <p className="detail-kicker">PUT IT INTO PRACTICE</p>
            <h2 id="practice-title">Make one small thing.</h2>
            <p>{stage.practice}</p>
          </section>
        </div>

        <aside className="detail-resources" aria-labelledby="detail-resources-title">
          <h2 data-reveal="" id="detail-resources-title" className="detail-section-title">Go deeper</h2>
          <p data-reveal="" className="detail-resources-intro">Useful resources for this stage.</p>
          {stageResources.map(resource => <a data-reveal="" className="detail-resource" key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer">
            <span className="detail-resource-format">{resource.format}</span>
            <h3>{resource.title}<ArrowUpRight aria-hidden="true" /></h3>
            <p>{resource.description}</p>
            <span className="sr-only">Opens in a new tab</span>
          </a>)}
        </aside>
      </div>

      <nav className="detail-pagination" aria-label="Learning stages">
        {previous ? <a data-reveal="" href={previous.path}><span>PREVIOUS STAGE</span><strong><ArrowLeft aria-hidden="true" /> {previous.title}</strong></a>
          : <a data-reveal="" href="/"><span>THE FULL PICTURE</span><strong><ArrowLeft aria-hidden="true" /> Learning path</strong></a>}
        {next ? <a data-reveal="" className="detail-next" href={next.path}><span>NEXT STAGE</span><strong>{next.title} <ArrowRight aria-hidden="true" /></strong></a>
          : <a data-reveal="" className="detail-next" href="/"><span>BACK TO THE BEGINNING</span><strong>Learning path <ArrowRight aria-hidden="true" /></strong></a>}
      </nav>
    </main>
  </>;
}

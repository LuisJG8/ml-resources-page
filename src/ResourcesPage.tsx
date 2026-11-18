import { useEffect } from 'react';
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import ResourceLibrary from './ResourceLibrary.tsx';
import { readResourceFilters } from './resource-library-state.ts';
import { useScrollReveal } from './useScrollReveal.ts';
import './resources-page.css';

export default function ResourcesPage() {
  useScrollReveal();
  const initial = readResourceFilters(window.location.search);

  useEffect(() => {
    document.title = 'Resources — Pipeline';
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', 'Browse machine learning certifications, books, courses, and interactive lessons. Search topics and filter by category.');
  }, []);

  return <>
    <a className="skip-link" href="#resource-results">Skip to resources</a>
    <main className="resources-page" aria-labelledby="resources-title">
      <a data-reveal="" className="detail-back" href="/"><ArrowLeft aria-hidden="true" /> Back to the learning path</a>
      <h1 className="sr-only" id="resources-title">Resource library</h1>
      <ResourceLibrary initialGroup={initial.group} initialQuery={initial.query} initialCategory={initial.category} />
    </main>
  </>;
}

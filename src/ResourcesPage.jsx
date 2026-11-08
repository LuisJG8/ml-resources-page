import { useEffect } from 'react';
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import ResourceLibrary from './ResourceLibrary.jsx';
import { readResourceFilters } from './resource-library-state.js';
import { useScrollReveal } from './useScrollReveal.js';
import './resources-page.css';

export default function ResourcesPage() {
  useScrollReveal();
  const initial = readResourceFilters(window.location.search);

  useEffect(() => {
    document.title = 'Resources — Pipeline';
    document.querySelector('meta[name="description"]').content = 'Browse machine learning videos, certifications, books, courses, tutorials, interactive lessons, and datasets. Search topics and filter by category.';
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

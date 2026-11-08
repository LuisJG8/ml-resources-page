import { useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { resourceCategories } from './resources.js';
import { filterLibraryResources, resourceLibraryHref } from './resource-library-state.js';
import { ProgressiveImage } from './ProgressiveImage.jsx';

export default function ResourceLibrary({ initialGroup = 'All resources', initialQuery = '', initialCategory = 'all' }) {
  const [group, setGroup] = useState(initialGroup);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const filtered = filterLibraryResources({ group, query, category });
  const sections = resourceCategories.map(item => ({
    ...item, resources: filtered.filter(resource => resource.category === item.id),
  })).filter(item => item.resources.length);

  useEffect(() => {
    window.history.replaceState(window.history.state, '', resourceLibraryHref(group, query, category));
  }, [group, query, category]);

  function clearFilters() {
    setQuery('');
    setGroup('All resources');
    setCategory('all');
  }

  return <>
    <label data-reveal="" className="search"><MagnifyingGlass aria-hidden="true" /><span className="sr-only">Search resources</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search topics, resources, or formats…" /></label>
    <div className="filters library-categories" role="group" aria-label="Filter resources by category">
      {[{ id: 'all', label: 'All categories' }, ...resourceCategories].map(item => <button type="button" data-reveal="" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
    </div>
    <div className="library-toolbar">
      <p data-reveal="" className="results-count" role="status">{filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}</p>
      {group !== 'All resources' && <button data-reveal="" type="button" className="library-reset" onClick={() => setGroup('All resources')}>View all resources</button>}
    </div>
    <div id="resource-results" className="library-results" tabIndex={-1}>
      {sections.length ? sections.map(section => <section key={section.id} className="resource-category" aria-labelledby={`category-${section.id}`}>
        <h2 data-reveal="" id={`category-${section.id}`}>{section.label}<span>{section.resources.length}</span></h2>
        {section.resources.map(item => <a data-reveal="" key={item.id} className="library-resource" href={item.url} target="_blank" rel="noopener noreferrer">
          <div><span className="resource-meta">{item.format}{item.access && <span className="resource-access">{item.access}</span>}</span><h3>{item.title}</h3><p>{item.description}</p></div>
          <span className="library-resource-preview" aria-hidden="true">
            <ProgressiveImage data-reveal={undefined} className="resource-thumbnail" src={item.image} width="240" height="176" alt="" />
            <ArrowUpRight />
          </span><span className="sr-only">Opens in a new tab</span>
        </a>)}
      </section>) : <div data-reveal="" className="empty-state"><h3>No matching resources.</h3><p>Try a different search or category.</p><button className="more-link" onClick={clearFilters}>Show all resources <ArrowRight aria-hidden="true" /></button></div>}
    </div>
  </>;
}

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { resourceCategories } from './resources.js';
import { chooseResourceIds, filterLibraryResources, resourceLibraryHref } from './resource-library-state.js';
import { ProgressiveImage } from './ProgressiveImage.jsx';

export default function ResourceLibrary({ initialGroup = 'All resources', initialQuery = '', initialCategory = 'all' }) {
  const [group, setGroup] = useState(initialGroup);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [selectedIds, setSelectedIds] = useState(null);
  const [selectionNumber, setSelectionNumber] = useState(0);
  const chooseButton = useRef(null);
  const filtered = filterLibraryResources({ group, query, category });
  const selected = selectedIds === null ? null : new Set(selectedIds);
  const displayed = selected ? filtered.filter(resource => selected.has(resource.id)) : filtered;
  const sections = resourceCategories.map(item => ({
    ...item, resources: displayed.filter(resource => resource.category === item.id),
  })).filter(item => item.resources.length);

  useEffect(() => {
    window.history.replaceState(window.history.state, '', resourceLibraryHref(group, query, category));
  }, [group, query, category]);

  function clearFilters() {
    setSelectedIds(null);
    setQuery('');
    setGroup('All resources');
    setCategory('all');
  }

  return <>
    <div data-reveal="" className="library-controls">
      <label className="search"><MagnifyingGlass aria-hidden="true" /><span className="sr-only">Search resources</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setSelectedIds(null); }} placeholder="Search topics, resources, or formats…" /></label>
      <button ref={chooseButton} type="button" className="library-choose" aria-controls="resource-results" aria-describedby={selected ? 'library-selection-note' : undefined} disabled={!filtered.length} onClick={() => { setSelectedIds(chooseResourceIds(filtered)); setSelectionNumber(number => number + 1); }}>{selected ? 'Choose again' : 'Choose for me'}</button>
    </div>
    <div className="filters library-categories" role="group" aria-label="Filter resources by category">
      {[{ id: 'all', label: 'All categories' }, ...resourceCategories].map(item => <button type="button" data-reveal="" key={item.id} aria-pressed={category === item.id} onClick={() => { if (category !== item.id) { setCategory(item.id); setSelectedIds(null); } }}>{item.label}</button>)}
    </div>
    <div className="library-toolbar">
      <p data-reveal="" className="results-count" role="status" aria-atomic="true">{selected ? `${displayed.length} ${displayed.length === 1 ? 'pick' : 'picks'} from ${filtered.length} ${filtered.length === 1 ? 'match' : 'matches'}` : `${filtered.length} ${filtered.length === 1 ? 'resource' : 'resources'}`}{selected && <span className="sr-only">. Selection {selectionNumber}.</span>}</p>
      <div className="library-actions">
        {selected && <button data-reveal="" type="button" className="library-reset" onClick={() => { setSelectedIds(null); chooseButton.current?.focus(); }}>Show all matches</button>}
        {group !== 'All resources' && <button data-reveal="" type="button" className="library-reset" onClick={() => { setGroup('All resources'); setSelectedIds(null); chooseButton.current?.focus(); }}>View all resources</button>}
      </div>
    </div>
    {selected && <p data-reveal="" id="library-selection-note" className="library-selection-note">Up to 3 per category. Categories with 3 or fewer matches keep all their resources.</p>}
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

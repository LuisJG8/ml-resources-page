import { stages, resources, resourceCategories } from './resources.js';

const slug = stage => stage.toLowerCase().replaceAll(' ', '-');

export function isResourcesPath(pathname) {
  return pathname.replace(/\/+$/, '') === '/resources';
}

export function readResourceFilters(search) {
  const params = new URLSearchParams(search);
  return {
    group: stages.find(stage => slug(stage) === params.get('stage')) || 'All resources',
    query: params.get('q') || '',
    category: resourceCategories.find(category => category.id === params.get('category'))?.id || 'all',
  };
}

export function resourceLibraryHref(group = 'All resources', query = '', category = 'all') {
  const params = new URLSearchParams();
  if (stages.includes(group)) params.set('stage', slug(group));
  if (resourceCategories.some(item => item.id === category)) params.set('category', category);
  if (query) params.set('q', query);
  const search = params.toString();
  return `/resources${search ? `?${search}` : ''}`;
}

export function filterLibraryResources({ group = 'All resources', query = '', category = 'all' } = {}) {
  const search = query.toLowerCase().trim();
  return resources.filter(item => {
    const categoryLabel = resourceCategories.find(candidate => candidate.id === item.category)?.label || '';
    return (group === 'All resources' || item.group === group)
      && (category === 'all' || item.category === category)
      && `${item.title} ${item.description} ${item.format} ${item.group} ${categoryLabel}`.toLowerCase().includes(search);
  });
}

export function chooseResourceIds(matches, random = Math.random) {
  const categories = new Map();
  for (const resource of matches) {
    if (!categories.has(resource.category)) categories.set(resource.category, []);
    categories.get(resource.category).push(resource.id);
  }

  const selected = new Set();
  for (const ids of categories.values()) {
    // Partial Fisher–Yates sampling gives every resource an equal chance.
    const count = Math.min(3, ids.length);
    if (ids.length > count) {
      for (let index = 0; index < count; index++) {
        const swap = index + Math.floor(random() * (ids.length - index));
        [ids[index], ids[swap]] = [ids[swap], ids[index]];
      }
    }
    ids.slice(0, count).forEach(id => selected.add(id));
  }
  return matches.filter(resource => selected.has(resource.id)).map(resource => resource.id);
}

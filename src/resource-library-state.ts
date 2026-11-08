import { stages, resources, resourceCategories } from './resources.ts';
import type { CategoryFilter, Resource, ResourceCategory, ResourceGroup } from './resources.ts';

export interface ResourceFilters {
  group: ResourceGroup;
  query: string;
  category: CategoryFilter;
}

const slug = (stage: string) => stage.toLowerCase().replaceAll(' ', '-');

export function isResourcesPath(pathname: string): boolean {
  return pathname.replace(/\/+$/, '') === '/resources';
}

export function readResourceFilters(search: string): ResourceFilters {
  const params = new URLSearchParams(search);
  return {
    group: stages.find(stage => slug(stage) === params.get('stage')) || 'All resources',
    query: params.get('q') || '',
    category: resourceCategories.find(category => category.id === params.get('category'))?.id || 'all',
  };
}

export function resourceLibraryHref(group: string = 'All resources', query = '', category: string = 'all'): string {
  const params = new URLSearchParams();
  if (stages.some(stage => stage === group)) params.set('stage', slug(group));
  if (resourceCategories.some(item => item.id === category)) params.set('category', category);
  if (query) params.set('q', query);
  const search = params.toString();
  return `/resources${search ? `?${search}` : ''}`;
}

export function filterLibraryResources({ group = 'All resources', query = '', category = 'all' }: Partial<Record<keyof ResourceFilters, string>> = {}): Resource[] {
  const search = query.toLowerCase().trim();
  return resources.filter(item => {
    const categoryLabel = resourceCategories.find(candidate => candidate.id === item.category)?.label || '';
    return (group === 'All resources' || item.group === group)
      && (category === 'all' || item.category === category)
      && `${item.title} ${item.description} ${item.format} ${item.group} ${categoryLabel}`.toLowerCase().includes(search);
  });
}

export function chooseResourceIds(matches: readonly Resource[], random: () => number = Math.random): string[] {
  const categories = new Map<ResourceCategory, string[]>();
  for (const resource of matches) {
    const ids = categories.get(resource.category);
    if (ids) ids.push(resource.id);
    else categories.set(resource.category, [resource.id]);
  }

  const selected = new Set<string>();
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

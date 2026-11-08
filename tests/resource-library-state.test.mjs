import test from 'node:test';
import assert from 'node:assert/strict';
import { stages, resources, resourceCategories } from '../src/resources.js';
import { isResourcesPath, readResourceFilters, resourceLibraryHref, filterLibraryResources } from '../src/resource-library-state.js';

test('the dedicated resources route supports a trailing slash without matching other pages', () => {
  assert.equal(isResourcesPath('/resources'), true);
  assert.equal(isResourcesPath('/resources/'), true);
  for (const path of ['/', '/production', '/resources-other', '/resources/topic']) {
    assert.equal(isResourcesPath(path), false);
  }
});

test('every stage and searches with special characters survive a shared URL', () => {
  const query = 'trees & SQL + data/source?';
  for (const group of ['All resources', ...stages]) {
    const url = new URL(resourceLibraryHref(group, query), 'https://example.test');
    assert.equal(url.pathname, '/resources');
    assert.deepEqual(readResourceFilters(url.search), { group, query, category: 'all' });
  }
  assert.equal(resourceLibraryHref('Production'), '/resources?stage=production');
  assert.equal(resourceLibraryHref('Modeling'), '/resources?stage=modeling');
});

test('unknown stages fall back to all resources and cleared filters use the base route', () => {
  assert.deepEqual(readResourceFilters('?stage=unknown&q=pandas'), { group: 'All resources', query: 'pandas', category: 'all' });
  assert.deepEqual(readResourceFilters(''), { group: 'All resources', query: '', category: 'all' });
  assert.equal(resourceLibraryHref('All resources', ''), '/resources');
  assert.equal(resourceLibraryHref('unknown'), '/resources');
});

test('every resource belongs to one populated format category', () => {
  assert.equal(new Set(resources.map(resource => resource.id)).size, resources.length);
  for (const resource of resources) {
    assert.ok(resourceCategories.some(category => category.id === resource.category), `uncategorized resource ${resource.id}`);
  }
  for (const category of resourceCategories) {
    assert.ok(resources.some(resource => resource.category === category.id), `empty category ${category.label}`);
  }
  assert.ok(resources.some(resource => resource.category === 'certifications'));
});

test('category, learning stage, and search apply together', () => {
  assert.deepEqual(filterLibraryResources({ category: 'books', group: 'Modeling' }).map(resource => resource.id), ['isl']);
  assert.deepEqual(filterLibraryResources({ category: 'videos', group: 'Production' }), []);
  assert.deepEqual(filterLibraryResources({ category: 'certifications', group: 'Data Sourcing', query: ' Azure ' }).map(resource => resource.id), ['azure-data-fundamentals']);
  assert.deepEqual(filterLibraryResources({ category: 'videos', query: 'linear' }).map(resource => resource.id), ['linear']);
  assert.equal(filterLibraryResources().length, resources.length);
});

test('format selection survives URL refreshes and invalid categories fall back safely', () => {
  for (const category of resourceCategories) {
    const url = new URL(resourceLibraryHref('Modeling', 'trees & SQL', category.id), 'https://example.test');
    assert.deepEqual(readResourceFilters(url.search), { group: 'Modeling', query: 'trees & SQL', category: category.id });
  }
  assert.equal(readResourceFilters('?category=unknown').category, 'all');
  assert.equal(resourceLibraryHref('All resources', '', 'all'), '/resources');
});


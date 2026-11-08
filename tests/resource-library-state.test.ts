import test from 'node:test';
import assert from 'node:assert/strict';
import { stages, resources, resourceCategories } from '../src/resources.ts';
import { isResourcesPath, readResourceFilters, resourceLibraryHref, filterLibraryResources, chooseResourceIds } from '../src/resource-library-state.ts';

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

test('choosing limits every format to three distinct resources and retains display order', () => {
  const matches = filterLibraryResources();
  const ids = chooseResourceIds(matches, () => 0.75);
  const chosen = matches.filter(resource => ids.includes(resource.id));
  assert.equal(ids.length, 14);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, chosen.map(resource => resource.id));
  for (const category of resourceCategories) {
    const available = matches.filter(resource => resource.category === category.id);
    assert.equal(chosen.filter(resource => resource.category === category.id).length, Math.min(3, available.length));
  }
});

test('choosing only uses current matches, including combined stage, format, and query filters', () => {
  for (const filters of [
    { group: 'Data Cleaning' },
    { group: 'Modeling', category: 'tutorials', query: 'model' },
    { category: 'certifications', group: 'Data Sourcing', query: 'Azure' },
  ]) {
    const matches = filterLibraryResources(filters);
    assert.ok(matches.length);
    const ids = chooseResourceIds(matches, () => 0.5);
    assert.ok(ids.length);
    assert.ok(ids.every(id => matches.some(resource => resource.id === id)));
  }
});

test('empty and small categories keep all available matches without requesting randomness', () => {
  const unexpectedRandom = () => assert.fail('small categories do not need sampling');
  assert.deepEqual(chooseResourceIds([], unexpectedRandom), []);
  for (const category of ['videos', 'certifications', 'interactive']) {
    const matches = filterLibraryResources({ category });
    assert.deepEqual(chooseResourceIds(matches, unexpectedRandom), matches.map(resource => resource.id));
  }
});

test('random draws can change picks without mutating input resources or their ordering', () => {
  const matches = Object.freeze(filterLibraryResources({ category: 'tutorials' }).map(resource => Object.freeze({ ...resource })));
  const before = JSON.stringify(matches);
  const first = chooseResourceIds(matches, () => 0);
  const last = chooseResourceIds(matches, () => 0.999999);
  assert.deepEqual(first, matches.slice(0, 3).map(resource => resource.id));
  assert.notDeepEqual(last, first);
  assert.equal(JSON.stringify(matches), before);
});

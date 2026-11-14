import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resources, resourceCategories, stages, certificationProviders } from '../src/resources.ts';
import { studyResources } from '../src/study-resources.ts';

test('the curated library has the requested formats and keeps the original statistics book', () => {
  assert.deepEqual(resourceCategories.map(category => category.id), ['videos', 'certifications', 'books', 'courses', 'interactive']);
  assert.equal(resources.find(resource => resource.id === 'isl')?.url, 'https://www.statlearning.com/');
  assert.equal(new Set(resources.map(resource => resource.url)).size, resources.length);
  for (const resource of resources) {
    assert.equal(new URL(resource.url).protocol, 'https:');
    assert.ok(existsSync(new URL(`../public${resource.image}`, import.meta.url)), `missing thumbnail: ${resource.id}`);
  }
});

test('books cover every pipeline stage and include additional statistics choices', () => {
  const books = resources.filter(resource => resource.category === 'books');
  for (const stage of stages) assert.ok(books.filter(book => book.group === stage).length >= 3, `few books for ${stage}`);
  for (const id of ['isl', 'think-stats', 'openintro-statistics', 'practical-statistics']) {
    assert.ok(books.some(book => book.id === id), `missing statistics book: ${id}`);
  }
});

test('certifications link to all five requested providers and disclose paid exams', () => {
  const certs = resources.filter(resource => resource.category === 'certifications');
  for (const host of ['aws.amazon.com', 'learn.microsoft.com', 'cloud.google.com', 'www.databricks.com', 'learn.snowflake.com']) {
    assert.ok(certs.some(resource => new URL(resource.url).hostname === host), `missing provider: ${host}`);
  }
  assert.ok(certs.every(resource => resource.access));
  assert.ok(certs.every(resource => resource.access === 'Paid exam'));
  for (const cert of certs) assert.ok(certificationProviders.some(provider => provider.id === cert.provider));
  for (const id of ['ibm-data-science', 'datacamp-data-scientist']) assert.ok(!certs.some(cert => cert.id === id));
  assert.ok(certs.every(resource => !/azure-data-scientist|azure-ai-engineer|snowpro-advanced-datascientist/.test(resource.url)));
});

test('removing library formats preserves the existing study references without leaking them into results', () => {
  for (const id of ['uci', 'openml', 'pitfalls', 'preprocessing', 'persistence', 'numpy', 'pandas', 'sklearn', 'validation']) {
    assert.ok(studyResources.some(resource => resource.id === id), `lost study reference: ${id}`);
    assert.ok(!resources.some(resource => resource.id === id), `study-only resource in library: ${id}`);
  }
});

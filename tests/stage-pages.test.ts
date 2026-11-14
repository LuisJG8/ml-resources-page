import test from 'node:test';
import assert from 'node:assert/strict';
import { stagePages, getStagePage } from '../src/stage-pages.ts';
import { studyResources as resources } from '../src/study-resources.ts';

test('each main section resolves to its own populated detail page', () => {
  const paths = ['/daata-sourcing', '/data-cleaning', '/modeling', '/production'];
  assert.deepEqual(stagePages.map(stage => stage.path), paths);
  assert.equal(new Set(stagePages.map(stage => stage.id)).size, 4);
  for (const stage of stagePages) {
    assert.equal(getStagePage(stage.path), stage);
    assert.equal(getStagePage(`${stage.path}/`), stage);
    assert.equal(stage.topics.length, 3);
    assert.ok(stage.practice);
    assert.ok(stage.resourceIds.length >= 2);
    for (const id of stage.resourceIds) assert.ok(resources.find(resource => resource.id === id), `missing resource ${id}`);
  }
});

test('the standard sourcing spelling also works, and the home path stays separate', () => {
  assert.equal(getStagePage('/data-sourcing'), getStagePage('/daata-sourcing'));
  assert.equal(getStagePage('/'), undefined);
});

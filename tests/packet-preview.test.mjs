import test from 'node:test';
import assert from 'node:assert/strict';
import { packetSamples, packetPreviewPosition } from '../src/packet-samples.js';

test('all three packets have distinct four-column, five-row sample tables', () => {
  assert.equal(packetSamples.length, 3);
  assert.equal(new Set(packetSamples.map(sample => JSON.stringify(sample.rows))).size, 3);
  for (const sample of packetSamples) {
    assert.equal(sample.columns.length, 4);
    assert.equal(sample.rows.length + 1, 5);
    assert.ok(sample.rows.every(row => row.length === 4));
  }
});

const anchor = (left, top) => ({ left, top, right: left + 32, bottom: top + 32, width: 32, height: 32 });
const bubble = { width: 280, height: 236 };

test('a preview appears above and to the right when space is available', () => {
  const position = packetPreviewPosition(anchor(200, 500), bubble, { width: 1200, height: 900 });
  assert.equal(position.left, 220);
  assert.equal(position.top, 260);
  assert.equal(position.edge, 'bottom');
});

test('top-edge previews point sideways and top-corner previews point upward', () => {
  assert.equal(packetPreviewPosition(anchor(200, 30), bubble, { width: 1200, height: 900 }).edge, 'left');
  const corner = packetPreviewPosition(anchor(1100, 30), bubble, { width: 1200, height: 900 });
  assert.equal(corner.edge, 'top');
  assert.equal(corner.top, 66);
});

test('previews stay inside desktop and phone viewport boundaries', () => {
  for (const viewport of [{ width: 1200, height: 900 }, { width: 320, height: 568 }]) {
    for (const rect of [anchor(2, 1), anchor(viewport.width - 35, 1), anchor(2, viewport.height - 34), anchor(viewport.width - 35, viewport.height - 34)]) {
      const position = packetPreviewPosition(rect, bubble, viewport);
      assert.ok(position.left >= 12);
      assert.ok(position.top >= 12);
      assert.ok(position.left + bubble.width <= viewport.width - 12);
      assert.ok(position.top + bubble.height <= viewport.height - 12);
    }
  }
});

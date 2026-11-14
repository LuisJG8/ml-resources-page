import test from 'node:test';
import assert from 'node:assert/strict';
import { desktopPipeGeometry, extendedY, croppedY, PIPE_ENTRY_CROP, PIPE_FINISH_START, PIPE_FINISH_END, PIPE_FINISH_BANDS } from '../src/pipe-geometry.ts';

const near = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} should equal ${expected}`);

test('the shorter entry preserves the longer study bays and straight finish', () => {
  // The responsive desktop artwork is capped at 896 CSS pixels.
  for (const scale of [320 / 941, 680 / 941, 896 / 941]) {
    const { extras } = desktopPipeGeometry(scale);
    assert.equal(extras[0], 0, 'the former 50px entry extension is removed');
    assert.ok(extras.slice(1).every(extra => extra > 0), 'study bay extensions remain positive');
    near((extendedY(341, extras) - extendedY(-36, extras)) * scale, 217 * scale);
    near((extendedY(808, extras) - extendedY(545, extras)) * scale, 263 * scale + 200);
    near((extendedY(1194, extras) - extendedY(1012, extras)) * scale, 263 * scale + 400);
    near(((extendedY(1296, extras) - extendedY(910, extras)) - (extendedY(910, extras) - extendedY(443, extras))) * scale, 200);
    near((extendedY(1782, extras) - extendedY(1398, extras)) * scale, 384 * scale + 100);
    near((extendedY(1296, extras) - 1296) * scale, 600 - 79 * scale);
    near((extendedY(1672, extras) - 1672) * scale, 700 - 79 * scale);
    near((extendedY(1884, extras) - 1884) * scale, 700 - 79 * scale);
  }
});

test('the entry crop joins straight glass and keeps the upper collar and bend aligned', () => {
  assert.deepEqual(PIPE_ENTRY_CROP, [110, 270]);
  assert.equal(croppedY(110), croppedY(270), 'the cropped slices meet with no gap');
  assert.equal(croppedY(72), 72, 'the first collar stays fixed');
  assert.ok(!desktopPipeGeometry(896 / 941).couplings.some(([left, top]) => left === 31 && top === 133), 'the removed lower entry collar no longer hides packets');
  assert.equal(croppedY(443) - croppedY(341), 102, 'the entry bend retains its radius');
});

test('coupling masks follow the extended artwork without changing band size', () => {
  const scale = 896 / 941;
  const { couplings } = desktopPipeGeometry(scale);
  assert.deepEqual(couplings[0], [31, 72, 78, 20]);
  near((couplings[1][1] - 409) * scale, -160 * scale);
  assert.deepEqual(couplings[1].slice(2), [22, 75]);
  near((couplings[2][1] - 664) * scale, 200 - 160 * scale);
  near((couplings[4][1] - 1077) * scale, 200 - 160 * scale);
  near((couplings[5][1] - 1255) * scale, 600 - 79 * scale);
  near((couplings[7][1] - PIPE_FINISH_START) * scale, 700 - 79 * scale);
  assert.deepEqual(couplings[7].slice(2), [77, 20]);
  assert.equal(couplings.length, 9, 'only the lower entry collar is removed; both finish collars remain');
});

test('the final packet run continues straight down to the page bottom', () => {
  const { route, extras, couplings } = desktopPipeGeometry(896 / 941);
  assert.ok(route.endsWith(`L 876 ${extendedY(PIPE_FINISH_END, extras)}`));
  assert.equal(PIPE_FINISH_BANDS[0], PIPE_FINISH_START, 'a silver collar covers the raster join');
  assert.equal(PIPE_FINISH_BANDS[1] + 20, PIPE_FINISH_END, 'the final collar reaches the pipe endpoint');
  assert.deepEqual(couplings.slice(-2), PIPE_FINISH_BANDS.map(top => [835, extendedY(top, extras), 77, 20]));
  assert.ok(!route.includes('L 656'), 'no turn toward the former robot');
});

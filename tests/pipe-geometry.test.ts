import test from 'node:test';
import assert from 'node:assert/strict';
import { desktopPipeGeometry, extendedY, PIPE_FINISH_START, PIPE_FINISH_END, PIPE_FINISH_BANDS } from '../src/pipe-geometry.ts';

const near = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} should equal ${expected}`);

test('cleaning gains 200px of study space while the other pipe runs stay intact', () => {
  // The responsive desktop artwork is capped at 896 CSS pixels.
  for (const scale of [320 / 941, 680 / 941, 896 / 941]) {
    const { extras } = desktopPipeGeometry(scale);
    assert.ok(extras.every(extra => extra > 0), 'raster extensions remain positive');
    near((extendedY(341, extras) - extendedY(-36, extras)) * scale, 377 * scale + 50);
    near((extendedY(808, extras) - extendedY(545, extras)) * scale, 263 * scale + 200);
    near((extendedY(1194, extras) - extendedY(1012, extras)) * scale, 263 * scale + 400);
    near(((extendedY(1296, extras) - extendedY(910, extras)) - (extendedY(910, extras) - extendedY(443, extras))) * scale, 200);
    near((extendedY(1782, extras) - extendedY(1398, extras)) * scale, 384 * scale + 100);
    near((extendedY(1296, extras) - 1296) * scale, 650 + 81 * scale);
    near((extendedY(1672, extras) - 1672) * scale, 750 + 81 * scale);
    near((extendedY(1884, extras) - 1884) * scale, 750 + 81 * scale);
  }
});

test('coupling masks follow the extended artwork without changing band size', () => {
  const scale = 896 / 941;
  const { couplings } = desktopPipeGeometry(scale);
  assert.deepEqual(couplings[0], [31, 72, 78, 20]);
  near((couplings[2][1] - 409) * scale, 50);
  assert.deepEqual(couplings[2].slice(2), [22, 75]);
  near((couplings[3][1] - 664) * scale, 250);
  near((couplings[5][1] - 1077) * scale, 250);
  near((couplings[6][1] - 1255) * scale, 650 + 81 * scale);
  near((couplings[8][1] - PIPE_FINISH_START) * scale, 750 + 81 * scale);
  assert.deepEqual(couplings[8].slice(2), [77, 20]);
  assert.equal(couplings.length, 10, 'both finish collars occlude document packets');
});

test('the final packet run continues straight down to the page bottom', () => {
  const { route, extras, couplings } = desktopPipeGeometry(896 / 941);
  assert.ok(route.endsWith(`L 876 ${extendedY(PIPE_FINISH_END, extras)}`));
  assert.equal(PIPE_FINISH_BANDS[0], PIPE_FINISH_START, 'a silver collar covers the raster join');
  assert.equal(PIPE_FINISH_BANDS[1] + 20, PIPE_FINISH_END, 'the final collar reaches the pipe endpoint');
  assert.deepEqual(couplings.slice(-2), PIPE_FINISH_BANDS.map(top => [835, extendedY(top, extras), 77, 20]));
  assert.ok(!route.includes('L 656'), 'no turn toward the former robot');
});

export const PIPE_CUTS = [320, 600, 1140, 1540];
export const PIPE_EXTENSIONS_PX = [50, 200, 400, 100];
// Cleaning's original straight is 81 native pixels shorter than sourcing.
// Retain that compensation beneath Cleaning's additional 200px of study space.
const PIPE_NATIVE_ADJUSTMENTS = [0, 0, 81, 0];
export const PIPE_FINISH_START = 1672;
export const PIPE_FINISH_END = 2122;
export const PIPE_FINISH_BANDS = [PIPE_FINISH_START, PIPE_FINISH_END - 20];

export type Coupling = [left: number, top: number, width: number, height: number];

const COUPLINGS: Coupling[] = [
  [31, 72, 78, 20], [31, 293, 78, 20],
  [445, 409, 22, 75], [835, 664, 77, 20],
  [445, 870, 22, 77], [24, 1077, 76, 21],
  [445, 1255, 22, 77], [833, 1464, 78, 21],
  ...PIPE_FINISH_BANDS.map((top): Coupling => [835, top, 77, 20]),
];

export function extendedY(y: number, extras: readonly number[]): number {
  return y + PIPE_CUTS.reduce((offset, cut, index) => offset + (y >= cut ? extras[index] : 0), 0);
}

export function desktopPipeGeometry(scale: number) {
  const extras = PIPE_EXTENSIONS_PX.map((extension, index) => extension / scale + PIPE_NATIVE_ADJUSTMENTS[index]);
  const y = (value: number) => extendedY(value, extras);
  const route = `M 68 -36 L 68 ${y(341)} Q 68 ${y(443)} 170 ${y(443)} L 774 ${y(443)} Q 876 ${y(443)} 876 ${y(545)} L 876 ${y(808)} Q 876 ${y(910)} 774 ${y(910)} L 163 ${y(910)} Q 61 ${y(910)} 61 ${y(1012)} L 61 ${y(1194)} Q 61 ${y(1296)} 163 ${y(1296)} L 774 ${y(1296)} Q 876 ${y(1296)} 876 ${y(1398)} L 876 ${y(PIPE_FINISH_END)}`;
  return {
    extras,
    route,
    couplings: COUPLINGS.map(([left, top, width, height]): Coupling => [left, y(top), width, height]),
  };
}

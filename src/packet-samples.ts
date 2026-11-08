export type FourColumns = readonly [string, string, string, string];
export interface PacketSample {
  title: string;
  columns: FourColumns;
  rows: readonly [FourColumns, FourColumns, FourColumns, FourColumns];
}

export interface ViewportSize { width: number; height: number }
export interface PreviewPosition {
  left: number;
  top: number;
  tail: number;
  edge: 'bottom' | 'left' | 'top';
}

// Five rows including the header, with four columns in every preview.
export const packetSamples: readonly PacketSample[] = [
  {
    title: 'Customer data',
    columns: ['ID', 'Age', 'City', 'Plan'],
    rows: [
      ['C101', '29', 'Boston', 'Pro'],
      ['C102', '34', 'Austin', 'Free'],
      ['C103', '41', 'Denver', 'Pro'],
      ['C104', '26', 'Seattle', 'Free'],
    ],
  },
  {
    title: 'Sensor readings',
    columns: ['Time', 'Temp °C', 'Hum. %', 'Status'],
    rows: [
      ['09:00', '21.5', '42', 'OK'],
      ['09:05', '22.1', '40', 'OK'],
      ['09:10', '23.8', '38', 'Check'],
      ['09:15', '22.4', '41', 'OK'],
    ],
  },
  {
    title: 'Model predictions',
    columns: ['Row', 'Actual', 'Score', 'Class'],
    rows: [
      ['001', '1', '0.94', 'Yes'],
      ['002', '0', '0.12', 'No'],
      ['003', '1', '0.87', 'Yes'],
      ['004', '0', '0.08', 'No'],
    ],
  },
];

export function packetPreviewPosition(anchor: Pick<DOMRect, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>, bubble: ViewportSize, viewport: ViewportSize): PreviewPosition {
  const margin = 12;
  const gap = 4;
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));
  const preferredTop = anchor.top - bubble.height - gap;
  // Tuck the bubble above the icon's right half so the tail nearly touches it.
  const preferredLeft = preferredTop < margin ? anchor.right + gap : anchor.left + anchor.width / 2 + gap;
  const maxLeft = viewport.width - bubble.width - margin;
  const left = clamp(preferredLeft, margin, maxLeft);
  const maxTop = viewport.height - bubble.height - margin;
  let top = clamp(preferredTop, margin, maxTop);
  let edge: PreviewPosition['edge'] = 'bottom';
  let tail = clamp(anchor.left + anchor.width / 2 - left, 10, bubble.width - 24);
  if (preferredTop < margin && preferredLeft <= maxLeft) {
    // Near the top edge, stay to the right and point sideways at the icon.
    edge = 'left';
    tail = clamp(anchor.top + anchor.height / 2 - top - 6, 12, bubble.height - 24);
  } else if (preferredTop < margin) {
    // A top corner has no space above or beside the icon: place it below.
    top = clamp(anchor.bottom + gap, margin, maxTop);
    edge = 'top';
  }
  return { left, top, tail, edge };
}

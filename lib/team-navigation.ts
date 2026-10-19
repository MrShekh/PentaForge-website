export function teamIndex(position: number, count: number) {
  return count > 0 ? ((position % count) + count) % count : 0;
}

export function teamKeyStep(key: string, position: number, count: number): number | null {
  if (count < 2) return null;
  if (key === 'ArrowRight') return position + 1;
  if (key === 'ArrowLeft') return position - 1;
  if (key === 'Home') return position - teamIndex(position, count);
  if (key === 'End') return position + count - 1 - teamIndex(position, count);
  return null;
}

/** Deliberate horizontal gestures only; ordinary taps and vertical scrolling do not navigate. */
export function teamSwipeStep(x: number, y: number) {
  return Math.abs(x) >= 45 && Math.abs(x) > Math.abs(y) * 1.25 ? (x < 0 ? 1 : -1) : 0;
}

export function teamSelectionPosition(position: number, target: number, count: number) {
  const distance = teamIndex(target - teamIndex(position, count), count);
  return position + (distance > count / 2 ? distance - count : distance);
}

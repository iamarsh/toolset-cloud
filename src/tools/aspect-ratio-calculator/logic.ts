/**
 * Aspect Ratio Calculator Logic
 */

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export function simplifyRatio(width: number, height: number): { width: number; height: number } {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 }
  const divisor = gcd(width, height)
  return { width: width / divisor, height: height / divisor }
}

export function calculateDimension(
  known: number,
  ratioW: number,
  ratioH: number,
  knownIs: 'width' | 'height'
): number {
  if (known <= 0 || ratioW <= 0 || ratioH <= 0) return 0
  return knownIs === 'width'
    ? Math.round((known / ratioW) * ratioH)
    : Math.round((known / ratioH) * ratioW)
}

export const commonRatios = [
  { name: '16:9', w: 16, h: 9, use: 'HD Video, YouTube' },
  { name: '4:3', w: 4, h: 3, use: 'Classic TV, iPad' },
  { name: '1:1', w: 1, h: 1, use: 'Instagram, Square' },
  { name: '9:16', w: 9, h: 16, use: 'Stories, TikTok' },
  { name: '21:9', w: 21, h: 9, use: 'Ultrawide, Cinema' },
  { name: '3:2', w: 3, h: 2, use: 'DSLR Photos' },
  { name: '5:4', w: 5, h: 4, use: 'Large Format' },
]

export function calculatePercentage(base: number, percentage: number): number {
  return (base * percentage) / 100
}

export function percentageChange(original: number, newValue: number): number {
  if (original === 0) return 0
  return ((newValue - original) / original) * 100
}

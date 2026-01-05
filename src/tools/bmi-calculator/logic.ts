export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: string } {
  if (!weightKg || !heightCm) return { bmi: 0, category: 'N/A' }
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  return { bmi, category: categorizeBMI(bmi) }
}

function categorizeBMI(bmi: number): string {
  if (bmi === 0 || !Number.isFinite(bmi)) return 'N/A'
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

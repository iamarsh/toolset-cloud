/**
 * Resume Parser Logic
 * Extract structured data from resumes
 */

export interface ParsedResume {
  rawText: string
  name: string | null
  email: string | null
  phone: string | null
  location: string | null
  skills: string[]
  education: EducationEntry[]
  experience: ExperienceEntry[]
  summary: string | null
}

export interface EducationEntry {
  institution: string
  degree: string
  year: string
}

export interface ExperienceEntry {
  company: string
  title: string
  duration: string
  description: string
}

/**
 * Extract email from text
 */
export function extractEmail(text: string): string | null {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const match = text.match(emailRegex)
  return match ? match[0] : null
}

/**
 * Extract phone number from text
 */
export function extractPhone(text: string): string | null {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
  const match = text.match(phoneRegex)
  return match ? match[0] : null
}

/**
 * Extract name from resume (typically first line or near contact info)
 */
export function extractName(text: string): string | null {
  const lines = text.split('\n').filter((line: string) => line.trim().length > 0)
  if (lines.length === 0) return null

  // Usually the name is in the first few lines
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim()
    // Check if line looks like a name (2-4 words, starts with capital, no special chars)
    if (
      trimmed.length > 3 &&
      trimmed.length < 50 &&
      /^[A-Z][a-z]+(\s[A-Z][a-z]+){1,3}$/.test(trimmed)
    ) {
      return trimmed
    }
  }

  return lines[0].trim()
}

/**
 * Extract location from text
 */
export function extractLocation(text: string): string | null {
  // Look for common location patterns
  const locationRegex = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z]{2})\b/
  const match = text.match(locationRegex)
  return match ? match[0] : null
}

/**
 * Extract skills from text
 */
export function extractSkills(text: string): string[] {
  const commonSkills = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Go',
    'Rust',
    'React',
    'Angular',
    'Vue',
    'Node',
    'Express',
    'Django',
    'Flask',
    'Spring',
    'SQL',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'Git',
    'CI/CD',
    'Agile',
    'Scrum',
    'REST',
    'GraphQL',
    'HTML',
    'CSS',
    'Sass',
    'Tailwind',
    'Bootstrap',
    'Webpack',
    'Next.js',
    'Nest.js',
    'TensorFlow',
    'PyTorch',
    'Machine Learning',
    'AI',
    'Data Analysis',
    'Excel',
    'Tableau',
    'Power BI',
    'Figma',
    'Photoshop',
    'Illustrator',
    'Leadership',
    'Communication',
    'Problem Solving',
    'Team Management',
  ]

  const foundSkills: string[] = []
  const lowerText = text.toLowerCase()

  for (const skill of commonSkills) {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill)
    }
  }

  return foundSkills
}

/**
 * Extract education entries
 */
export function extractEducation(text: string): EducationEntry[] {
  const education: EducationEntry[] = []
  const educationRegex = /(Bachelor|Master|PhD|BS|MS|BA|MA|Associate|Diploma).*?(\d{4})/gi

  let match: RegExpExecArray | null
  while ((match = educationRegex.exec(text)) !== null) {
    // Try to extract institution (usually on same line or previous line)
    const contextStart = Math.max(0, match.index - 100)
    const contextEnd = Math.min(text.length, match.index + match[0].length + 100)
    const context = text.substring(contextStart, contextEnd)

    const lines = context.split('\n')
    const matchLine = lines.find((line: string) => line.includes(match[0]))

    if (matchLine) {
      education.push({
        institution: 'University', // Simplified - would need better parsing
        degree: match[1] || 'Degree',
        year: match[2] || 'N/A',
      })
    }
  }

  return education
}

/**
 * Extract work experience
 */
export function extractExperience(text: string): ExperienceEntry[] {
  const experience: ExperienceEntry[] = []

  // Look for year ranges that typically indicate work experience
  const experienceRegex = /(\d{4})\s*[-–]\s*(\d{4}|Present|Current)/gi

  let match: RegExpExecArray | null
  while ((match = experienceRegex.exec(text)) !== null) {
    const contextStart = Math.max(0, match.index - 150)
    const contextEnd = Math.min(text.length, match.index + 150)
    const context = text.substring(contextStart, contextEnd)

    const lines = context.split('\n').map((line: string) => line.trim())

    experience.push({
      company: 'Company', // Simplified
      title: 'Position', // Simplified
      duration: match[0],
      description: lines.join(' ').substring(0, 200),
    })
  }

  return experience.slice(0, 5) // Limit to 5 most recent
}

/**
 * Extract professional summary
 */
export function extractSummary(text: string): string | null {
  const summaryKeywords = [
    'summary',
    'profile',
    'objective',
    'about',
    'professional summary',
    'career objective',
  ]

  const lines = text.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()

    if (summaryKeywords.some((keyword: string) => line.includes(keyword))) {
      // Get next 3-5 lines as summary
      const summaryLines = lines.slice(i + 1, i + 6).filter((l: string) => l.trim().length > 0)
      if (summaryLines.length > 0) {
        return summaryLines.join(' ').substring(0, 500)
      }
    }
  }

  return null
}

/**
 * Parse resume text into structured data
 */
export function parseResumeText(text: string): ParsedResume {
  return {
    rawText: text,
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    location: extractLocation(text),
    skills: extractSkills(text),
    education: extractEducation(text),
    experience: extractExperience(text),
    summary: extractSummary(text),
  }
}

/**
 * Export parsed resume as JSON
 */
export function exportAsJSON(resume: ParsedResume): void {
  const json = JSON.stringify(resume, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `resume-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export parsed resume as CSV
 */
export function exportAsCSV(resume: ParsedResume): void {
  const rows = [
    ['Field', 'Value'],
    ['Name', resume.name || ''],
    ['Email', resume.email || ''],
    ['Phone', resume.phone || ''],
    ['Location', resume.location || ''],
    ['Skills', resume.skills.join(', ')],
    ['Summary', resume.summary || ''],
  ]

  const csv = rows.map((row: string[]) => row.map((cell: string) => `"${cell}"`).join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `resume-${Date.now()}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Copy field to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}

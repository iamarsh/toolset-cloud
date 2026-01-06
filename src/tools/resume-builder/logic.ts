/**
 * Resume Builder Logic
 * Create professional resumes with multiple sections
 */

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate: Date | null
  current: boolean
  description: string
  createdAt: Date
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate: Date | null
  current: boolean
  createdAt: Date
}

export interface Resume {
  id: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Create a new resume
 */
export function createResume(): Resume {
  const now = new Date()
  return {
    id: generateId(),
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Update personal information
 */
export function updatePersonalInfo(
  resume: Resume,
  info: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
): Resume {
  return {
    ...resume,
    personalInfo: info,
    updatedAt: new Date(),
  }
}

/**
 * Add work experience
 */
export function addWorkExperience(
  resume: Resume,
  company: string,
  position: string,
  startDate: Date,
  endDate: Date | null,
  current: boolean,
  description: string
): Resume {
  const newExperience: WorkExperience = {
    id: generateId(),
    company,
    position,
    startDate,
    endDate,
    current,
    description,
    createdAt: new Date(),
  }

  return {
    ...resume,
    workExperience: [...resume.workExperience, newExperience],
    updatedAt: new Date(),
  }
}

/**
 * Delete work experience
 */
export function deleteWorkExperience(resume: Resume, experienceId: string): Resume {
  return {
    ...resume,
    workExperience: resume.workExperience.filter((exp: WorkExperience) => exp.id !== experienceId),
    updatedAt: new Date(),
  }
}

/**
 * Add education
 */
export function addEducation(
  resume: Resume,
  institution: string,
  degree: string,
  field: string,
  startDate: Date,
  endDate: Date | null,
  current: boolean
): Resume {
  const newEducation: Education = {
    id: generateId(),
    institution,
    degree,
    field,
    startDate,
    endDate,
    current,
    createdAt: new Date(),
  }

  return {
    ...resume,
    education: [...resume.education, newEducation],
    updatedAt: new Date(),
  }
}

/**
 * Delete education
 */
export function deleteEducation(resume: Resume, educationId: string): Resume {
  return {
    ...resume,
    education: resume.education.filter((edu: Education) => edu.id !== educationId),
    updatedAt: new Date(),
  }
}

/**
 * Add skill
 */
export function addSkill(resume: Resume, skill: string): Resume {
  return {
    ...resume,
    skills: [...resume.skills, skill],
    updatedAt: new Date(),
  }
}

/**
 * Remove skill
 */
export function removeSkill(resume: Resume, skill: string): Resume {
  return {
    ...resume,
    skills: resume.skills.filter((s: string) => s !== skill),
    updatedAt: new Date(),
  }
}

/**
 * Save resume to localStorage
 */
export function saveResume(resume: Resume): void {
  localStorage.setItem(`resume-${resume.id}`, JSON.stringify(resume))
}

/**
 * Load resume from localStorage
 */
export function loadResume(id: string): Resume | null {
  try {
    const data = localStorage.getItem(`resume-${id}`)
    if (!data) return null

    const resume = JSON.parse(data) as Resume
    // Convert date strings back to Date objects
    resume.createdAt = new Date(resume.createdAt)
    resume.updatedAt = new Date(resume.updatedAt)
    resume.workExperience = resume.workExperience.map((exp: WorkExperience) => ({
      ...exp,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : null,
      createdAt: new Date(exp.createdAt),
    }))
    resume.education = resume.education.map((edu: Education) => ({
      ...edu,
      startDate: new Date(edu.startDate),
      endDate: edu.endDate ? new Date(edu.endDate) : null,
      createdAt: new Date(edu.createdAt),
    }))

    return resume
  } catch {
    return null
  }
}

/**
 * Get all resumes
 */
export function getAllResumes(): Resume[] {
  const resumes: Resume[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('resume-')) {
      const id = key.replace('resume-', '')
      const resume = loadResume(id)
      if (resume) resumes.push(resume)
    }
  }

  return resumes.sort((a: Resume, b: Resume) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

/**
 * Delete resume
 */
export function deleteResume(id: string): void {
  localStorage.removeItem(`resume-${id}`)
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

/**
 * Export resume as text
 */
export function exportAsText(resume: Resume): string {
  let text = `${resume.personalInfo.fullName.toUpperCase()}\n`
  text += '='.repeat(resume.personalInfo.fullName.length) + '\n\n'

  if (resume.personalInfo.email) text += `Email: ${resume.personalInfo.email}\n`
  if (resume.personalInfo.phone) text += `Phone: ${resume.personalInfo.phone}\n`
  if (resume.personalInfo.location) text += `Location: ${resume.personalInfo.location}\n`
  text += '\n'

  if (resume.personalInfo.summary) {
    text += `SUMMARY\n-------\n${resume.personalInfo.summary}\n\n`
  }

  if (resume.workExperience.length > 0) {
    text += `WORK EXPERIENCE\n---------------\n`
    resume.workExperience.forEach((exp: WorkExperience) => {
      text += `\n${exp.position} at ${exp.company}\n`
      text += `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate!)}\n`
      text += `${exp.description}\n`
    })
    text += '\n'
  }

  if (resume.education.length > 0) {
    text += `EDUCATION\n---------\n`
    resume.education.forEach((edu: Education) => {
      text += `\n${edu.degree} in ${edu.field}\n`
      text += `${edu.institution}\n`
      text += `${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate!)}\n`
    })
    text += '\n'
  }

  if (resume.skills.length > 0) {
    text += `SKILLS\n------\n`
    text += resume.skills.join(' • ') + '\n'
  }

  return text
}

/**
 * Download resume as text file
 */
export function downloadResume(resume: Resume): void {
  const text = exportAsText(resume)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const filename = resume.personalInfo.fullName
    ? `${resume.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.txt`
    : 'resume.txt'
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

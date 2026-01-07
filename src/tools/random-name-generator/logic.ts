// Name data
const firstNames = {
  male: [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
    'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Alexander', 'Ethan', 'Jacob',
  ],
  female: [
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
    'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn',
  ],
}

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
]

const businessWords = {
  prefix: [
    'Global', 'Tech', 'Digital', 'Smart', 'Prime', 'Elite', 'Pro', 'Next', 'Blue', 'Green',
    'Bright', 'Clear', 'Fast', 'Quick', 'Solid', 'Core', 'Peak', 'Nova', 'Apex', 'Alpha',
  ],
  suffix: [
    'Solutions', 'Systems', 'Group', 'Labs', 'Works', 'Corp', 'Inc', 'Enterprises', 'Partners', 'Ventures',
    'Tech', 'Soft', 'Hub', 'Studio', 'Media', 'Services', 'Consulting', 'Network', 'Cloud', 'Digital',
  ],
}

const usernameAdjectives = [
  'cool', 'super', 'mega', 'ultra', 'epic', 'amazing', 'awesome', 'stellar', 'cosmic', 'digital',
  'cyber', 'shadow', 'dark', 'bright', 'swift', 'wild', 'bold', 'clever', 'smart', 'wise',
]

const usernameNouns = [
  'gamer', 'coder', 'ninja', 'wizard', 'master', 'legend', 'champion', 'hero', 'warrior', 'knight',
  'phoenix', 'dragon', 'tiger', 'wolf', 'eagle', 'falcon', 'storm', 'thunder', 'lightning', 'blaze',
]

export type NameType = 'person' | 'business' | 'username'
export type Gender = 'male' | 'female' | 'any'

/**
 * Generate random person name
 */
export function generatePersonName(gender: Gender): string {
  let firstName: string

  if (gender === 'any') {
    const allFirstNames = [...firstNames.male, ...firstNames.female]
    firstName = allFirstNames[Math.floor(Math.random() * allFirstNames.length)]
  } else {
    const names = firstNames[gender]
    firstName = names[Math.floor(Math.random() * names.length)]
  }

  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  return `${firstName} ${lastName}`
}

/**
 * Generate random business name
 */
export function generateBusinessName(): string {
  const prefix = businessWords.prefix[Math.floor(Math.random() * businessWords.prefix.length)]
  const suffix = businessWords.suffix[Math.floor(Math.random() * businessWords.suffix.length)]

  return `${prefix} ${suffix}`
}

/**
 * Generate random username
 */
export function generateUsername(): string {
  const adj = usernameAdjectives[Math.floor(Math.random() * usernameAdjectives.length)]
  const noun = usernameNouns[Math.floor(Math.random() * usernameNouns.length)]
  const number = Math.floor(Math.random() * 1000)

  const formats = [
    `${adj}${noun}${number}`,
    `${adj}_${noun}`,
    `${noun}${number}`,
    `${adj}${number}`,
    `${adj}.${noun}`,
  ]

  return formats[Math.floor(Math.random() * formats.length)]
}

/**
 * Generate multiple names
 */
export function generateNames(count: number, type: NameType, gender: Gender = 'any'): string[] {
  const names: string[] = []

  for (let i = 0; i < count; i++) {
    let name: string
    switch (type) {
      case 'person':
        name = generatePersonName(gender)
        break
      case 'business':
        name = generateBusinessName()
        break
      case 'username':
        name = generateUsername()
        break
    }
    names.push(name)
  }

  return names
}

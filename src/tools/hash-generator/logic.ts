export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512'

export const hashAlgorithms: HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-512']

export async function hashText(text: string, algorithm: HashAlgorithm): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const digest = await crypto.subtle.digest(algorithm, data)
  return bufferToHex(digest)
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

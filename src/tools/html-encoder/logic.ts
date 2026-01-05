/**
 * HTML Encoder/Decoder Logic
 */

const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const reverseEntities: Record<string, string> = Object.fromEntries(
  Object.entries(htmlEntities).map(([k, v]) => [v, k])
)

export function encodeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char)
}

export function decodeHtml(text: string): string {
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => reverseEntities[entity] || entity)
}

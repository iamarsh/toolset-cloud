/**
 * HTML Entity Encoder/Decoder Logic
 */

// Common HTML entities mapping
const namedEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
  ' ': '&nbsp;',
  '¡': '&iexcl;',
  '¢': '&cent;',
  '£': '&pound;',
  '¤': '&curren;',
  '¥': '&yen;',
  '¦': '&brvbar;',
  '§': '&sect;',
  '¨': '&uml;',
  '©': '&copy;',
  'ª': '&ordf;',
  '«': '&laquo;',
  '¬': '&not;',
  '®': '&reg;',
  '°': '&deg;',
  '±': '&plusmn;',
  '²': '&sup2;',
  '³': '&sup3;',
  'µ': '&micro;',
  '¶': '&para;',
  '·': '&middot;',
  '¹': '&sup1;',
  '»': '&raquo;',
  '¼': '&frac14;',
  '½': '&frac12;',
  '¾': '&frac34;',
  '¿': '&iquest;',
  'À': '&Agrave;',
  'Á': '&Aacute;',
  'Â': '&Acirc;',
  'Ã': '&Atilde;',
  'Ä': '&Auml;',
  'Å': '&Aring;',
  'Æ': '&AElig;',
  'Ç': '&Ccedil;',
  'È': '&Egrave;',
  'É': '&Eacute;',
  'Ê': '&Ecirc;',
  'Ë': '&Euml;',
  'Ì': '&Igrave;',
  'Í': '&Iacute;',
  'Î': '&Icirc;',
  'Ï': '&Iuml;',
  'Ñ': '&Ntilde;',
  'Ò': '&Ograve;',
  'Ó': '&Oacute;',
  'Ô': '&Ocirc;',
  'Õ': '&Otilde;',
  'Ö': '&Ouml;',
  '×': '&times;',
  'Ø': '&Oslash;',
  'Ù': '&Ugrave;',
  'Ú': '&Uacute;',
  'Û': '&Ucirc;',
  'Ü': '&Uuml;',
  'Ý': '&Yacute;',
  'à': '&agrave;',
  'á': '&aacute;',
  'â': '&acirc;',
  'ã': '&atilde;',
  'ä': '&auml;',
  'å': '&aring;',
  'æ': '&aelig;',
  'ç': '&ccedil;',
  'è': '&egrave;',
  'é': '&eacute;',
  'ê': '&ecirc;',
  'ë': '&euml;',
  'ì': '&igrave;',
  'í': '&iacute;',
  'î': '&icirc;',
  'ï': '&iuml;',
  'ñ': '&ntilde;',
  'ò': '&ograve;',
  'ó': '&oacute;',
  'ô': '&ocirc;',
  'õ': '&otilde;',
  'ö': '&ouml;',
  '÷': '&divide;',
  'ø': '&oslash;',
  'ù': '&ugrave;',
  'ú': '&uacute;',
  'û': '&ucirc;',
  'ü': '&uuml;',
  'ý': '&yacute;',
  'ÿ': '&yuml;',
}

// Create reverse mapping for decoding
const entityToChar: Record<string, string> = {}
for (const [char, entity] of Object.entries(namedEntities)) {
  entityToChar[entity] = char
}

/**
 * Encode text to HTML entities
 */
export function encodeHtmlEntities(text: string, encodeAll: boolean = false): string {
  if (encodeAll) {
    // Encode all characters including alphanumeric
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0)
        return `&#${code};`
      })
      .join('')
  }

  // Encode using named entities where possible
  return text
    .split('')
    .map((char) => {
      // Check for named entity
      if (namedEntities[char]) {
        return namedEntities[char]
      }
      // Encode special characters as numeric entities
      const code = char.charCodeAt(0)
      if (code > 127 || char === '<' || char === '>' || char === '&' || char === '"' || char === "'") {
        return `&#${code};`
      }
      return char
    })
    .join('')
}

/**
 * Decode HTML entities to text
 */
export function decodeHtmlEntities(text: string): string {
  // Create a temporary element for browser decoding
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
  }

  // Fallback for server-side or when document is not available
  let decoded = text

  // Decode named entities
  for (const [entity, char] of Object.entries(entityToChar)) {
    const regex = new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    decoded = decoded.replace(regex, char)
  }

  // Decode numeric entities (&#169; or &#x00A9;)
  decoded = decoded.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))

  return decoded
}

/**
 * Get entity info for a character
 */
export function getEntityInfo(char: string): {
  char: string
  namedEntity?: string
  numericEntity: string
  hexEntity: string
  unicode: string
} {
  const code = char.charCodeAt(0)
  return {
    char,
    namedEntity: namedEntities[char],
    numericEntity: `&#${code};`,
    hexEntity: `&#x${code.toString(16).toUpperCase()};`,
    unicode: `U+${code.toString(16).toUpperCase().padStart(4, '0')}`,
  }
}

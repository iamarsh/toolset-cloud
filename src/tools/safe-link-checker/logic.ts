/**
 * Safe Link Checker Logic
 */

export interface LinkAnalysis {
  url: string
  isValid: boolean
  riskLevel: 'low' | 'medium' | 'high'
  warnings: string[]
  checks: {
    name: string
    passed: boolean
    message: string
  }[]
}

export function analyzeSafeLink(url: string): LinkAnalysis {
  const warnings: string[] = []
  const checks = []
  let riskLevel: 'low' | 'medium' | 'high' = 'low'

  // Try to parse URL
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return {
      url,
      isValid: false,
      riskLevel: 'high',
      warnings: ['Invalid URL format'],
      checks: [
        { name: 'URL Format', passed: false, message: 'Not a valid URL' },
      ],
    }
  }

  // Check 1: HTTPS
  const hasHttps = parsedUrl.protocol === 'https:'
  checks.push({
    name: 'HTTPS Protocol',
    passed: hasHttps,
    message: hasHttps ? 'URL uses secure HTTPS' : 'URL uses insecure HTTP',
  })
  if (!hasHttps) {
    warnings.push('⚠️ Not using HTTPS encryption')
    riskLevel = 'medium'
  }

  // Check 2: IP address as hostname
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(parsedUrl.hostname)
  checks.push({
    name: 'Domain Format',
    passed: !isIpAddress,
    message: isIpAddress
      ? 'URL uses raw IP address'
      : 'URL uses domain name',
  })
  if (isIpAddress) {
    warnings.push('🚩 Uses IP address instead of domain (common in phishing)')
    riskLevel = 'high'
  }

  // Check 3: URL shorteners
  const shortenerDomains = [
    'bit.ly',
    't.co',
    'tinyurl.com',
    'goo.gl',
    'ow.ly',
    'is.gd',
    'buff.ly',
  ]
  const isShortener = shortenerDomains.some((d) =>
    parsedUrl.hostname.includes(d)
  )
  checks.push({
    name: 'URL Shortener',
    passed: !isShortener,
    message: isShortener
      ? 'URL is shortened (hides destination)'
      : 'Direct URL',
  })
  if (isShortener) {
    warnings.push('⚠️ URL shortener detected (final destination hidden)')
    if (riskLevel === 'low') riskLevel = 'medium'
  }

  // Check 4: Excessive subdomains
  const subdomainCount = parsedUrl.hostname.split('.').length - 2
  const hasExcessiveSubdomains = subdomainCount > 2
  checks.push({
    name: 'Subdomain Count',
    passed: !hasExcessiveSubdomains,
    message: hasExcessiveSubdomains
      ? `${subdomainCount} subdomains (unusual)`
      : 'Normal subdomain structure',
  })
  if (hasExcessiveSubdomains) {
    warnings.push('⚠️ Excessive subdomains detected')
    if (riskLevel === 'low') riskLevel = 'medium'
  }

  // Check 5: Non-standard ports
  const port = parsedUrl.port
  const hasNonStandardPort = port && port !== '80' && port !== '443'
  checks.push({
    name: 'Port',
    passed: !hasNonStandardPort,
    message: hasNonStandardPort
      ? `Non-standard port ${port}`
      : 'Standard port',
  })
  if (hasNonStandardPort) {
    warnings.push(`🚩 Non-standard port ${port} (unusual)`)
    riskLevel = 'high'
  }

  // Check 6: Suspicious TLDs
  const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top']
  const hostname = parsedUrl.hostname.toLowerCase()
  const hasSuspiciousTld = suspiciousTlds.some((tld) => hostname.endsWith(tld))
  checks.push({
    name: 'Domain Extension',
    passed: !hasSuspiciousTld,
    message: hasSuspiciousTld ? 'Uses high-risk TLD' : 'Common TLD',
  })
  if (hasSuspiciousTld) {
    warnings.push('⚠️ Uses TLD commonly associated with spam/phishing')
    if (riskLevel === 'low') riskLevel = 'medium'
  }

  // Check 7: Suspicious characters in domain
  const hasSuspiciousChars = /[^\w\.\-]/.test(parsedUrl.hostname)
  checks.push({
    name: 'Special Characters',
    passed: !hasSuspiciousChars,
    message: hasSuspiciousChars
      ? 'Contains unusual characters'
      : 'Normal characters',
  })
  if (hasSuspiciousChars) {
    warnings.push('🚩 Domain contains unusual characters')
    riskLevel = 'high'
  }

  // Check 8: Very long URL (possible obfuscation)
  const isVeryLong = url.length > 200
  checks.push({
    name: 'URL Length',
    passed: !isVeryLong,
    message: isVeryLong
      ? `Very long URL (${url.length} chars)`
      : 'Normal length',
  })
  if (isVeryLong) {
    warnings.push('⚠️ Unusually long URL (may indicate obfuscation)')
    if (riskLevel === 'low') riskLevel = 'medium'
  }

  // Check 9: @ symbol (username in URL, rarely legitimate)
  const hasAtSymbol = url.includes('@')
  checks.push({
    name: 'Username in URL',
    passed: !hasAtSymbol,
    message: hasAtSymbol ? 'Contains @ symbol' : 'No @ symbol',
  })
  if (hasAtSymbol) {
    warnings.push('🚩 Contains @ symbol (can redirect to unexpected domain)')
    riskLevel = 'high'
  }

  // Check 10: Double slashes in path
  const hasDoubleSlash = parsedUrl.pathname.includes('//')
  checks.push({
    name: 'Path Format',
    passed: !hasDoubleSlash,
    message: hasDoubleSlash ? 'Unusual path structure' : 'Normal path',
  })
  if (hasDoubleSlash) {
    warnings.push('⚠️ Unusual path structure detected')
    if (riskLevel === 'low') riskLevel = 'medium'
  }

  return {
    url,
    isValid: true,
    riskLevel,
    warnings,
    checks,
  }
}

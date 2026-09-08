const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_PATTERN.test(email)
}

export function requireNewsletterEmail(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return null
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Email is required' })
    return null
  }

  return email
}

export function newsletterError(res, status, fallbackMessage) {
  return res.status(status).json({ error: fallbackMessage })
}

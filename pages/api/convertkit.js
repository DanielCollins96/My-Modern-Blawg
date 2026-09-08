import { requireNewsletterEmail, newsletterError } from '@/lib/newsletter'

const handler = async (req, res) => {
  const email = requireNewsletterEmail(req, res)
  if (!email) return

  const FORM_ID = process.env.CONVERTKIT_FORM_ID
  const API_KEY = process.env.CONVERTKIT_API_KEY
  const API_URL = process.env.CONVERTKIT_API_URL

  if (!FORM_ID || !API_KEY || !API_URL) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }

  try {
    const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
      body: JSON.stringify({ email, api_key: API_KEY }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      return newsletterError(res, 400, 'There was an error subscribing to the list.')
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }
}

export default handler

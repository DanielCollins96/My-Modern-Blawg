import { requireNewsletterEmail, newsletterError } from '@/lib/newsletter'

const handler = async (req, res) => {
  const email = requireNewsletterEmail(req, res)
  if (!email) return

  const API_KEY = process.env.BUTTONDOWN_API_KEY
  const API_URL = process.env.BUTTONDOWN_API_URL

  if (!API_KEY || !API_URL) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }

  try {
    const response = await fetch(`${API_URL}subscribers`, {
      body: JSON.stringify({ email }),
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      return newsletterError(res, 500, 'There was an error subscribing to the list.')
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }
}

export default handler

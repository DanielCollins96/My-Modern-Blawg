import { requireNewsletterEmail, newsletterError } from '@/lib/newsletter'

const handler = async (req, res) => {
  const email = requireNewsletterEmail(req, res)
  if (!email) return

  const API_KEY = process.env.KLAVIYO_API_KEY
  const LIST_ID = process.env.KLAVIYO_LIST_ID

  if (!API_KEY || !LIST_ID) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }

  try {
    const response = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Klaviyo-API-Key ${API_KEY}`,
          'Content-Type': 'application/json',
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: 'SUBSCRIBED',
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: LIST_ID,
                },
              },
            },
          },
        }),
      }
    )

    if (!response.ok) {
      return newsletterError(res, 400, 'There was an error subscribing to the list.')
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }
}

export default handler

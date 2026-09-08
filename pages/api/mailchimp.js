import mailchimp from '@mailchimp/mailchimp_marketing'
import { requireNewsletterEmail, newsletterError } from '@/lib/newsletter'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
})

const handler = async (req, res) => {
  const email = requireNewsletterEmail(req, res)
  if (!email) return

  if (!process.env.MAILCHIMP_AUDIENCE_ID) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
    })
    return res.status(201).json({ error: '' })
  } catch (error) {
    return newsletterError(res, 500, 'There was an error subscribing to the list.')
  }
}

export default handler

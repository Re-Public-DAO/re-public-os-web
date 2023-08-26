import { NextApiRequest, NextApiResponse } from 'next'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import {v4} from 'uuid'
import {readFile} from 'fs/promises'

const mailgun = new Mailgun(formData);

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'POST') {

    try {

      const token = v4()

      const domain = 'sandbox-123.mailgun.org'

      const url = `https://${req.headers.host}/api/auth/claim?token=${token}`

      let html = await readFile(`${process.cwd()}/emails/cloud-welcome.html`, 'utf8')

      html = html.replaceAll('{{action_url}}', url)

      // Get email and domain from central Re-Public server
      const toEmail = 'keith@axline.io'

      const text = `Hello, please click the following link to unlock to your Re-Public Cloud:\n\n${url}`

      await mg.messages.create('mg.re-public.io', {
        from: `Re-Public Cloud <noreply@${domain}>`,
        to: [toEmail],
        subject: "Unlock your Re-Public Cloud",
        text,
        html,
      })

      res.status(200).json({ message: 'Email sent' })

    } catch (error) {
      console.log(error)
    }

    // const authTokens = await prisma.authToken.findMany()
    //
    // console.log(req.headers.host)




  }

}

export default handler
import { NextApiRequest, NextApiResponse } from 'next'
import ParseServer                         from '@/utils/parseServer'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'GET') {

    const {query} = req

    if (!query.qr_code_key) {
      res.status(400).send('Bad request')
      return
    }

    const linkResponse = await fetch(`${process.env.RE_PUBLIC_API_URL}/api/devices/link/?key=${query.qr_code_key}`,)

    if (linkResponse.status !== 200) {
      res.status(500).send('Internal server error')
      return
    }

    const linkResponseJson = await linkResponse.json()

    res.status(200).json(linkResponseJson)
    return

  }

}

export default handler
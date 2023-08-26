import { NextApiRequest, NextApiResponse } from 'next'
import ParseServer                         from '@/utils/parseServer'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'GET') {

    await ParseServer.User.logIn(process.env.RE_PUBLIC_API_USERNAME, process.env.RE_PUBLIC_API_KEY)

    const queryApps = new ParseServer.Query('App')
    queryApps.equalTo('system', true)
    const apps = await queryApps.find()
    res.status(200).json(apps)
  }

}

export default handler
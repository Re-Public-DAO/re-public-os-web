import { NextApiRequest, NextApiResponse } from 'next'
import ParseServer                         from '@/utils/parseServer'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'GET') {
    const { query } = req

    console.log(query)

    await ParseServer.User.logIn(process.env.RE_PUBLIC_API_USERNAME, process.env.RE_PUBLIC_API_KEY)

    const queryApps = new ParseServer.Query('App')
    queryApps.equalTo('appStoreId', query.appStoreId)
    const app = await queryApps.first()
    res.status(200).json(app)
  }

}

export default handler
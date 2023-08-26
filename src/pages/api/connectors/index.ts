import { NextApiRequest, NextApiResponse } from 'next'
import ParseServer                         from '@/utils/parseServer'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'GET') {

    await ParseServer.User.logIn(process.env.RE_PUBLIC_API_USERNAME as string, process.env.RE_PUBLIC_API_KEY as string)

    const queryConnectors = new ParseServer.Query('Connector')
    const connectors = await queryConnectors.find()
    res.status(200).json(connectors)
  }

}

export default handler
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

    const queryConnectors = new ParseServer.Query('Connector')
    queryConnectors.equalTo('connectorId', query.connectorId)
    const connector = await queryConnectors.first()
    res.status(200).json(connector)
  }

}

export default handler
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'POST') {
    const { body, } = req
    const { appId, } = body

    console.log(appId)
  }

}

export default handler
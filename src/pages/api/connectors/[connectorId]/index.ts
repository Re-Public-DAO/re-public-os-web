import { NextApiRequest, NextApiResponse, } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'GET') {
    const { query, } = req

    console.log(query,)


    res.status(200,).json({},)
  }

}

export default handler

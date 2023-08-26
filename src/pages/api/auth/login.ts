import { NextApiRequest, NextApiResponse } from 'next'
import {withIronSessionApiRoute} from 'iron-session/next'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'POST' && req.headers && req.headers.cookie) {

    try {

      console.log(req.session)

      res.status(200).json({ message: 'OK' })


    } catch (error) {
      console.log(error)
    }


  }

}

export default withIronSessionApiRoute(handler, {
  cookieName: 're-public-cloud',
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  }
})
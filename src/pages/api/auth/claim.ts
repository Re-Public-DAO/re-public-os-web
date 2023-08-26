import { NextApiRequest, NextApiResponse } from 'next'
import jwt                                 from 'jsonwebtoken'
import cookieParser                        from 'cookie-parser'
import { withIronSessionApiRoute }         from 'iron-session/next'

const MAX_TOKEN_AGE_MINUTES = 2

const isTokenExpired = (createdAt: Date) => {
  const now = new Date()
  const diff = now.getTime() - createdAt.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  return minutes > MAX_TOKEN_AGE_MINUTES
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
): Promise<void> => {

  if (req.method === 'GET' && req.query && req.query.token) {

    try {

      const { query, } = req

      const { token, } = query

      console.log(token)

      // Create a user in Django associated with the token



      if (!token) {
        res.status(404).json({ message: 'Token not found' })
        return
      }

      console.log(token)

      await req.session.save()

      // const payload = {
      //   userId: 'USER_ID',
      //   email: 'email'
      // }
      //
      // // If not expired, delete token and return a JWT token with access
      // const newJwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
      //
      // // Set the JWT as a cookie in the response
      // res.setHeader('Set-Cookie', `re-public-auth=${newJwtToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24}; SameSite=Strict; Secure;`)

      res.status(200).json({ message: 'Authorized' })


    } catch (error) {
      console.log(error)
    }

    //
    // console.log(req.headers.host)




  }

}

export default withIronSessionApiRoute(handler, {
  cookieName: 're-public-cloud',
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  }
})
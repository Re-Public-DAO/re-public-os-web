import { sessionOptions }            from '@/utils/session'
import { NextRequest, NextResponse } from 'next/server'
import { getIronSession }            from 'iron-session'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  console.log(req.cookies.get('auth_token'))
  // const session = await getIronSession(req, res, sessionOptions);
  //
  // // do anything with session here:
  // const { user } = session;
  //
  // // like mutate user:
  // // user.something = someOtherThing;
  // // or:
  // // session.user = someoneElse;
  //
  // // uncomment next line to commit changes:
  // // await session.save();
  // // or maybe you want to destroy session:
  // // await session.destroy();
  //
  // console.log("from middleware", { user });
  //
  // // demo:
  // if (user?.login !== "vvo") {
  //   return new NextResponse(null, { status: 403 }); // unauthorized to see pages inside admin/
  // }

  return res;
};

// export const config = {
//   matcher: "*",
// };

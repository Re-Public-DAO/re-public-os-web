import { FC, useEffect, useState, } from 'react'
import { useLoggedInUser, }         from '@/utils/users'
import { useRouter, }               from 'next/router'

type Props = {}

const AuthChecker: FC<Props> = () => {

  const router = useRouter()

  const { user, hasAttemptedLogin, } = useLoggedInUser()

  const [ hasRedirected, setHasRedirected, ] = useState(false,)

  useEffect(() => {
    if (!hasRedirected && hasAttemptedLogin && !user) {
      router.replace('/',)
      setHasRedirected(true,)
    }
  }, [ user, router, hasRedirected, hasAttemptedLogin, ],)

  return (
    <></>
  )
}

export default AuthChecker

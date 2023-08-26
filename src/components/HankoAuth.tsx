import {register}                 from '@teamhanko/hanko-elements'
import { useCallback, useEffect } from 'react'
import { useRouter }              from 'next/router'

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL

const HankoAuth = () => {

  const router = useRouter();

  const redirectAfterLogin = useCallback(() => {
    // successfully logged in, redirect to a page in your application
    router.replace('/account');
  }, [router]);

  useEffect(() => {
    document.addEventListener("hankoAuthSuccess", redirectAfterLogin);
    return () =>
      document.removeEventListener("hankoAuthSuccess", redirectAfterLogin);
  }, [redirectAfterLogin]);

  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({ shadow: true })
      .catch((error) => {
        // handle error
      })
  }, [])

  return (
    <hanko-auth api={hankoApi} />
  )
}

export default HankoAuth
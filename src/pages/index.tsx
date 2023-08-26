import { GetServerSideProps, }             from 'next'
import LogoAnimation                       from '@/components/LogoAnimation'
import { useIsUnlocked, useLoggedInUser, } from '@/utils/users'
import Unlock                              from '@/components/Unlock'
import { useEffect, }                      from 'react'
import { useRouter, }                      from 'next/router'
import Login                               from '@/components/Login'


const Home = () => {

  const { user, hasAttemptedLogin, } = useLoggedInUser()

  const { isUnlocked, } = useIsUnlocked()

  const router = useRouter()

  useEffect(() => {
    if (isUnlocked && hasAttemptedLogin && user) {
      router.replace('/apps',)
    }
  }, [ isUnlocked, hasAttemptedLogin, user, ],)

  return (
    <div
      className={'flex flex-col items-center justify-center'}
    >
      <LogoAnimation />
      <h1 className={'font-bold text-2xl mt-24 text-center'}>Welcome to your new digital life</h1>
      {
        !user &&
        !isUnlocked && (
          <Unlock />
        )
      }
      {
        isUnlocked &&
        hasAttemptedLogin &&
        !user && (
          <Login />
        )
      }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, },) => {



  return {
    props : {},
  }
}

export default Home

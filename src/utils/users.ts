import { useEffect, useState, } from 'react'
import Router                   from 'next/router'
import useSWR                   from 'swr'
import { User, }                from '@/pages/api/user'


type UserResponse = {
  username: string
  email: string
}

export const useLoggedInUser = () => {

  const [ hasAttemptedLogin, setHasAttemptedLogin, ] = useState(false,)

  const fetcherMe = async (): Promise<UserResponse | null> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/me/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      credentials : 'include',
    },)

    if (!res.ok || res.status !== 200) {
      console.log('fetcherMe returning null',)
      return null
    }

    const json = await res.json()
    console.log(json,)
    return json.user || null
  }

  const { data: user, isLoading, mutate, } = useSWR({
    key : 'me',
  }, fetcherMe, )

  useEffect(() => {
    if (!hasAttemptedLogin && user) {
      setHasAttemptedLogin(true,)
    }
    if (!hasAttemptedLogin && typeof user !== 'undefined') {
      setHasAttemptedLogin(true,)
    }

  }, [ user, hasAttemptedLogin, ],)


  return {
    isLoading,
    user,
    hasAttemptedLogin,
    mutate,
  }
}


export const useIsUnlocked = () => {

  const fetcherUnlocked = async (): Promise<boolean> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/unlocked`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
    },)

    if (!res.ok || res.status !== 200) {
      return false
    }

    const json = await res.json()
    console.log(json,)
    return json.unlocked
  }

  const { data: isUnlocked, isLoading, error, } = useSWR({
    key : 'isUnlocked',
  }, fetcherUnlocked, )

  return {
    isLoading,
    isUnlocked,
  }
}



export const useUser = ({
  redirectTo = '',
  redirectIfFound = false,
} = {},) => {
  const { data: user, mutate: mutateUser, } = useSWR<User>('/api/user',)

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) {return}

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo,)
    }
  }, [ user, redirectIfFound, redirectTo, ],)

  return { user, mutateUser, }
}

import useSWR           from 'swr'
import ParseClient      from '@/utils/parseClient'
import { useCookies, }  from 'react-cookie'
import { useMutation, } from '@tanstack/react-query'
import { Connector, }   from '@/utils/connectors'

const useSaveOauth = () => {
  const save = useMutation({
    mutationFn : async ({ oauth, },) => {

    },
    onSuccess : () => {

    },
  },)

  return {
    save,
  }
}

export const useOAuthState = (connectorId: string | null,) => {

  const [ cookies, setCookie, removeCookie, ] = useCookies([ 'oauthState', ],)

  const fetcherOAuthState = async ({ connectorIdInner, },) => {

    if (!connectorIdInner) {
      return null
    }

    console.log(`Fetching OAuth State for ${connectorIdInner}`,)

    // Check if the Re-Public OS server has an access token for this connector

    const url = `${process.env.NEXT_PUBLIC_API_URL}/oauth/${connectorIdInner}/`

    console.log(url,)

    const res = await fetch(url, {
      method  : 'GET',
      headers : {
        'Content-Type'  : 'application/json',
        'Authorization' : `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    },)

    const existingAuths = await res.json()

    console.log(existingAuths,)

    if (existingAuths.length > 0) {
      return existingAuths[0]
    }

  }

  const { data: oauthState, isLoading, error, mutate, } = useSWR({
    key              : `oauthState${connectorId}`,
    connectorIdInner : connectorId,
  }, fetcherOAuthState, )

  return {
    isLoading,
    oauthState,
    mutate,
  }
}



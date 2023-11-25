import useSWR      from 'swr'
import ParseClient from '@/utils/parseClient'

export type AvailableConnector = {
  objectId: string
  name: string
  description?: string
  connectorId: string
  image?: {
    __type: string
    name: string
    url: string
  }

}

export type ConnectorButton = {
  label: string
  url?: string
  action?: string
}

export type Oauth = {
  id: string | number
  sync_interval_minutes: number
}

export type Connector = {
  name: string
  description: string
  republic_id: string
  is_installed: boolean
  is_activated: boolean
  version_number: string
  build_number: string
  svg: string
  image: string
  buttons: ConnectorButton[]
  oauths: Oauth[]
}

export const useAvailableConnectors = () => {

  const fetcherApps = async (): Promise<ParseClient.Object[]> => {

    const queryConnectors = new ParseClient.Query('Connector',)
    return await queryConnectors.find()

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${process.env.NEXT_PUBLIC_API_KEY}`
    //   },
    //   mode: 'cors',
    // })
    // const json = await res.json()
    // console.log(json)
    // return json
  }

  const { data: availableConnectors, isLoading, error, } = useSWR('connectors', fetcherApps, )

  return {
    isLoading,
    availableConnectors,
  }
}

export const useActiveConnector = ( connectorId?: string | null,) => {

  const fetcherConnector = async ({ connectorIdInner, },): Promise<Connector | null | undefined> => {

    if (!connectorIdInner) {
      return null
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connectorIdInner}/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: connector, isLoading, error, } = useSWR({
    key              : `connector${connectorId}`,
    connectorIdInner : connectorId,
  }, fetcherConnector, )

  return {
    isLoading,
    connector,
  }
}

export const useSyncRepoCommits = ( connectorId?: string | null,) => {

  const fetcherConnector = async ({ connectorIdInner, },): Promise<Connector | null | undefined> => {

    if (!connectorIdInner) {
      return null
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connectorIdInner}/commits/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: commits, isLoading, error, } = useSWR({
    key              : `commits${connectorId}`,
    connectorIdInner : connectorId,
  }, fetcherConnector, )

  return {
    isLoading,
    commits,
  }
}


export const useConnectors = () => {

  const fetcherInstalledConnectors = async (): Promise<Connector[]> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: installedConnectors, isLoading, mutate, } = useSWR('installedConnectors', fetcherInstalledConnectors, )

  return {
    isLoading,
    installedConnectors,
    mutate,
  }
}

export const useAuthenticatedConnectors = () => {

  const fetcherAuthorizedConnectors = async (): Promise<string[]> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/authenticated/`, {
      method  : 'GET',
      headers : {
        'Content-Type'  : 'application/json',
        'Authorization' : `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: authorizedConnectors, isLoading, error, } = useSWR('authorizedConnectors', fetcherAuthorizedConnectors, )

  return {
    isLoading,
    authenticatedConnectors : authorizedConnectors,
  }
}

type RepublicEvent = {
  id: string
  actor?: string
  action?: string
  actorImage?: string
  taskId?: string
  timestamp?: string
  result?: string
}

export const useConnectorSyncs = ( connectorId?: string | null,) => {

  const fetcherConnector = async ({ connectorIdInner, },): Promise<RepublicEvent[] | null | undefined> => {

    if (!connectorIdInner) {
      return null
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connectorIdInner}/history/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: syncs, isLoading, mutate, error, } = useSWR({
    key              : `syncs${connectorId}`,
    connectorIdInner : connectorId,
  }, fetcherConnector, )

  return {
    isLoading,
    syncs,
    mutate,
  }
}

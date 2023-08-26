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

export type InstalledConnector = {
  name: string
  republic_id: string
  is_installed: boolean
  is_activated: boolean
  version_number: string
  build_number: string
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

export const useAvailableConnector = ( connectorId?: string | null,) => {

  const fetcherConnector = async ({ connectorIdInner, },): Promise<ParseClient.Object | null | undefined> => {

    if (!connectorIdInner) {
      return null
    }

    const queryConnectors = new ParseClient.Query('Connector',)
    queryConnectors.equalTo('connectorId', connectorIdInner,)
    return await queryConnectors.first()

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connectorIdInner}/`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'cors',
    // })
    // const json = await res.json()
    // console.log(json)
    // return json
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

export const useInstalledConnectors = () => {

  const fetcherInstalledConnectors = async (): Promise<InstalledConnector[]> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json.connectors
  }

  const { data: installedConnectors, isLoading, mutate, } = useSWR('installedConnectors', fetcherInstalledConnectors, )

  return {
    isLoading,
    installedConnectors,
    mutate,
  }
}

import useSWR      from 'swr'
import ParseClient from '@/utils/parseClient'

export type AppStoreListing = {
  objectId: string
  name: string
  description?: string
  singleInstallation: boolean
  priceUsd?: number
  image?: {
    __type: string
    name: string
    url: string
  }
  appStoreId: string
}

export const useApps = (system = false,) => {

  const urlModifier = system ? 'system' : 'store'

  const fetcherApps = async (): Promise<ParseClient.Object[]> => {

    const queryApps = new ParseClient.Query('App',)
    const apps = await queryApps.find()

    return apps

    // const res = await fetch(`/api/apps/${urlModifier}`, {
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

  const { data: apps, isLoading, error, } = useSWR({
    key : `apps${urlModifier}`,
  }, fetcherApps, )

  return {
    isLoading,
    apps,
  }
}

export const useApp = (appStoreId?: string | null,) => {

  const fetcherApp = async ({ appStoreIdInner, },): Promise<AppStoreListing | null> => {

    if (!appStoreIdInner) {
      return null
    }

    const res = await fetch(`/api/apps/${appStoreIdInner}`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      mode : 'cors',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: app, isLoading, error, } = useSWR({
    key             : `app${appStoreId}`,
    appStoreIdInner : appStoreId,
  }, fetcherApp, )

  return {
    isLoading,
    app,
  }
}

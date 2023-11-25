import useSWR from 'swr'

type VersionData = {
  version: string
}

export const useServerVersion = () => {
  const fetcherVersion = async () : Promise<VersionData | null | undefined> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/version/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    return json
  }

  const { data: versionData, isLoading, error, } = useSWR({
    key : 'version',
  }, fetcherVersion, )

  return {
    version : versionData ? versionData.version : '',
  }
}



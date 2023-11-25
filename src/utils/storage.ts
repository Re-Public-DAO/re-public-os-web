import useSWR from 'swr'

type StorageData = {
  usedDiskSpace?: number
  freeDiskSpace?: number
  totalDiskSpace?: number
  mediaSpaceUsed?: number
  republicAppSpaceUsed?: number
}

export const useStorageData = () => {
  const fetcherSystem = async () : Promise<StorageData | null | undefined> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/io.re-public.app.storage/info/`, {
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

  const { data: storageData, isLoading, error, } = useSWR({
    key : 'system',
  }, fetcherSystem, )

  return {
    storageData,
  }
}

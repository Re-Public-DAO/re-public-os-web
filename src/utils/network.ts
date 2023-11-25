import useSWR             from 'swr'
import { fetcherGetUrl, } from '@/utils'


export type ZeroTierNode = {
  id: string
  name: string
  ipAssignments: string[]
  creationTime: number
  authorized: boolean
}



export const useZeroTierNodes = () => {

  console.log(process.env.NEXT_PUBLIC_API_URL,)

  const { data, error, mutate, } = useSWR({
    key         : `${process.env.NEXT_PUBLIC_API_URL}/network/nodes/`,
    responseKey : 'nodes',
  }, fetcherGetUrl<ZeroTierNode[]>,)

  return {
    nodes     : data,
    isLoading : !error && !data,
    isError   : error,
    mutate,
  }
}

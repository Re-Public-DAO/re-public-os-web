import useSWR             from 'swr'
import { ZeroTierNode, }  from '@/utils/network'
import { fetcherGetUrl, } from '@/utils'



export const useNodeInfo = (nodeId: string,) => {
  const { data: nodeInfo, error, } = useSWR({
    key         : `${process.env.NEXT_PUBLIC_API_URL}/network/nodes/${nodeId}/`,
    responseKey : 'node',
  }, fetcherGetUrl<ZeroTierNode[]>,)

  return {
    nodeInfo,
    isLoading : !error && !nodeInfo,
    isError   : error,
  }
}

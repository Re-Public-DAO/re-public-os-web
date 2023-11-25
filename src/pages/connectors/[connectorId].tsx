import { NextPage, }                                                  from 'next'
import { useActiveConnector, useConnectorSyncs, useSyncRepoCommits, } from '@/utils/connectors'
import { useRouter, }                                                 from 'next/router'
import PageContainer                                                  from '@/components/PageContainer'
import Image                                                          from 'next/image'
import Button                                                         from '@/components/Button'
import { dayjs, }                                                     from '@/utils'

const ConnectorDetailPage: NextPage = () => {

  const { query, } = useRouter()

  const { connector, } = useActiveConnector(query.connectorId as string,)

  const { commits, } = useSyncRepoCommits(query.connectorId as string,)

  const { syncs, mutate, } = useConnectorSyncs(query.connectorId as string,)

  console.log(commits, )

  console.log(syncs,)

  const handleSyncClick = () => {
    const _sync = async (): Promise<void> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connector?.republic_id}/sync/`, {
        method  : 'POST',
        headers : {
          'Authorization' : `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type'  : 'application/json',
        },
      },)

      if (!res) {
        console.error('Error syncing connector',)
        return
      }

      const json = await res.json()
      console.log(json,)
      mutate()
    }

    _sync()
  }

  if (!connector) {return null}

  return (
    <PageContainer>
      <div
        className={'flex flex-row items-center'}
      >
        {
          connector &&
          !!connector.svg &&
          connector.svg && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${connector.svg}`}
              width={40}
              height={40}
              alt={connector.name}
              className={'max-w-32 object-contain object-center mr-5'}
            />
          )
        }
        <h1 className={'mb-0!'}>{connector.name}</h1>

      </div>
      {
        syncs &&
        syncs.length > 0 && (
          <div className={'px-4 sm:px-6 lg:px-8 bg-white rounded mt-12 pt-8 border border-stone-200'}>
            <div className={'sm:flex sm:items-center'}>
              <div className={'sm:flex-auto'}>
                <h2 className={'text-base font-semibold leading-6 text-gray-900'}>Activity</h2>
                {/*<p className={'mt-2 text-sm text-gray-700'}>A list of all the users in your account including their name, title, email and role.</p>*/}
              </div>
              <div className={'mt-4 sm:ml-16 sm:mt-0 sm:flex-none'}>
                <Button
                  className={'flex flex-row justify-center items-center w-32 h-10'}
                  onClick={handleSyncClick}
                >
                  Sync
                </Button>
              </div>
            </div>
            <div className={'mt-8 flow-root'}>
              <div className={'-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'}>
                <div className={'inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'}>
                  <table className={'mt-6 w-full whitespace-nowrap text-left'}>
                    <thead>
                      <tr>
                        <th scope={'col'} className={'py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0'}>Actor</th>
                        <th scope={'col'} className={'py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'}>Action</th>
                        <th scope={'col'} className={'py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'}>Time</th>
                        <th scope={'col'} className={'py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'}>Result</th>
                      </tr>
                    </thead>
                    <tbody className={'divide-y divide-white/5'}>
                      {
                        syncs.map((sync,) => (
                          <tr
                            key={sync.taskId}
                            className={'even:bg-gray-50'}
                          >
                            <td className={'py-4 pl-4 pr-8 sm:pl-6 lg:pl-8'}>
                              <div className={'flex items-center gap-x-4'}>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${connector.svg}`}
                                  width={40}
                                  height={40}
                                  alt={connector.name}
                                  className={'h-8 w-8 rounded-full bg-gray-800 object-contain object-center opacity-75'}
                                />
                                <div className={'truncate text-sm font-medium leading-6 text-stone-700'}>{sync.actor}</div>
                              </div>
                            </td>
                            <td className={'hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8'}>
                              <div className={'flex gap-x-3'}>
                                <div className={'font-mono text-sm leading-6 text-gray-400'}>{sync.action}</div>
                              </div>
                            </td>
                            <td className={'hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8'}>
                              <div className={'flex gap-x-3'}>
                                <div className={'font-mono text-sm leading-6 text-gray-400'}>{dayjs(sync.timestamp,).fromNow()}</div>
                              </div>
                            </td>
                            <td className={'hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8'}>
                              <div className={'flex gap-x-3'}>
                                <div className={'font-mono text-sm leading-6 text-gray-400'}>{sync.result}</div>
                              </div>
                            </td>
                          </tr>
                        ),)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </PageContainer>
  )
}

export default ConnectorDetailPage

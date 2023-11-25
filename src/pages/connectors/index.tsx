import { useConnectors, }              from '@/utils/connectors'
import PageContainer                   from '@/components/PageContainer'
import { useEffect, }                  from 'react'
import { useAuthenticatedConnectors, } from '@/utils/connectors'
import { NextPage, }                   from 'next'
import ConnectorListItem               from '@/components/Connector/ConnectorListItem'


const Connectors: NextPage = () => {

  const { installedConnectors, mutate, } = useConnectors()

  const { authenticatedConnectors, } = useAuthenticatedConnectors()

  console.log(authenticatedConnectors,)

  useEffect(() => {
    mutate()
  }, [],)



  return (
    <PageContainer>
      <h1>Connectors</h1>
      <div className={'top-1/2 left-1/2 transform flex w-auto space-x-10 mb-8 w-full'}>
        <div className={'flex items-center border rounded pl-4 bg-white w-full'}>
          <button className={'mr-2 text-gray-200 hover:text-gray-300'}>
            <svg width={'21'} height={'21'} viewBox={'0 0 21 21'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
              <path d={'M20.7 19.3L17 15.6C20.1 11.7 19.5 6 15.6 2.9C11.7 -0.2 5.99999 0.5 2.89999 4.3C-0.200006 8.2 0.499995 13.9 4.29999 17C7.59999 19.6 12.3 19.6 15.6 17L19.3 20.7C19.7 21.1 20.3 21.1 20.7 20.7C21.1 20.3 21.1 19.7 20.7 19.3ZM9.99999 17C6.09999 17 2.99999 13.9 2.99999 10C2.99999 6.1 6.09999 3 9.99999 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 9.99999 17Z'} fill={'currentColor'}></path>
            </svg>
          </button>
          <input className={'pl-2 py-3 text-stone-500 font-manrope outline-0 w-full'} type={'text'} placeholder={'Type to search...'} />
        </div>
      </div>
      <div className={'grid grid-cols-4 gap-8'}>
        {
          installedConnectors &&
          installedConnectors.length > 0 &&
          installedConnectors.map((connector,) => (
            <ConnectorListItem
              key={connector.republic_id}
              connector={connector}
            />
          ),
          )
        }
      </div>

    </PageContainer>
  )
}

export default Connectors

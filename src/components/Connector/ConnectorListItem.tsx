import { Connector, useAuthenticatedConnectors, }          from '@/utils/connectors'
import { FC, }                                             from 'react'
import Image                                               from 'next/image'
import { Cog6ToothIcon, KeyIcon, }                         from '@heroicons/react/24/outline'
import { useRouter, }                                      from 'next/router'
import { useAppDispatch, }                                 from '@/utils'
import { updateActiveConnector, updateIsAddingConnector, } from '@/redux/slices/app'


const ConnectorListItem: FC<{connector: Connector}> = ({ connector, },) => {

  const router = useRouter()

  const dispatch = useAppDispatch()

  const { authenticatedConnectors, } = useAuthenticatedConnectors()

  const handleConnectorClick = (republicId: string,): void => {
    if (isAuthenticated(republicId,)) {
      router.push(`/connectors/${republicId}`,)
    } else {
      dispatch(updateActiveConnector(republicId,),)
    }
  }

  const isAuthenticated = (republicId: string,): boolean => {
    if (authenticatedConnectors && authenticatedConnectors.length > 0) {
      return authenticatedConnectors.includes(republicId,)
    }

    return false
  }

  return (
    <div
      key={connector.name}
      className={`connector flex flex-col bg-white rounded-md p-4 cursor-pointer shadow-md hover:shadow-lg relative ${isAuthenticated(connector.republic_id,) ? 'opacity-100 authenticated' : 'opacity-25 unauthenticated'} transition-opacity duration-300 hover:opacity-100`}
      onClick={() => handleConnectorClick(connector.republic_id,)}
    >
      <div className={'flex flex-row items-center'}>
        {
          connector.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${connector.image}}`}
              width={50}
              height={50}
              alt={`Icon for ${connector.name}`}
            />
          )
        }
        {
          connector.svg && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${connector.svg}`}
              width={50}
              height={50}
              alt={`Icon for ${connector.name}`}
            />
          )
        }
        <span className={'ml-5 bold text-lg'}>{connector.name}</span>
        <div
          className={'icon-container opacity-0 transition-opacity duration-300 ml-auto absolute right-0 top-0 pt-1 pr-1'}
        >
          {
            isAuthenticated(connector.republic_id,) ? (
              <Cog6ToothIcon className={'w-4 h-4 text-stone-400'} />
            ) : (
              <KeyIcon className={'w-4 h-4 text-stone-400'} />
            )
          }

        </div>

      </div>
    </div>
  )
}

export default ConnectorListItem

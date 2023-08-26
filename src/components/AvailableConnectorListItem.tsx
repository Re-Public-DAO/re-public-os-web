import Image                      from 'next/image'
import { FunctionComponent, }     from 'react'
import { useAppDispatch, }        from '@/utils'
import { updateActiveConnector, } from '@/redux/slices/app'
import ParseClient                from '@/utils/parseClient'
import { useOAuthState, }         from '@/utils/oauth'
import { CheckCircleIcon, }       from '@heroicons/react/24/outline'

type Props = {
  connector: ParseClient.Object
}

const AvailableConnectorListItem: FunctionComponent<Props> = ( { connector, },) => {

  const dispatch = useAppDispatch()

  const { oauthState, } = useOAuthState(connector?.get('connectorId',) || null,)

  // console.log(oauthState)

  const handleConnectorClick = () => {
    if (oauthState) {return}
    dispatch(updateActiveConnector(connector.get('connectorId',),),)
  }

  return (
    <div
      className={'relative flex flex-row justify-start items-center h-12 rounded border border-gray-200 p-3 mb-3'}
      onClick={handleConnectorClick}
    >
      <div
        className={'w-8 h-8 mr-3'}
      >
        {
          connector &&
            !!connector.get('image',) &&
            connector.get('image',).url() && (
            <Image
              src={connector.get('image',).url()}
              width={200}
              height={200}
              alt={connector.get('name',)}
              className={'h-full object-contain object-center'}
            />

          )
        }

      </div>
      {
        oauthState && (
          <div className={'absolute top-0 right-0 mr-1 mt-1'}>
            <CheckCircleIcon className={'text-emerald-500 w-8'} />
          </div>
        )
      }
      <h4>{connector.get('name',)}</h4>
      {/*<button*/}
      {/*  className={'justify-self-end ml-auto text-xs font-normal'}*/}
      {/*>*/}
      {/*  Install*/}
      {/*</button>*/}
    </div>
  )
}

export default AvailableConnectorListItem

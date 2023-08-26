import { FC, }                                                                from 'react'
import Dialog                                                                 from '@/components/Dialog'
import { useAppDispatch, useAppSelector, }                                    from '@/utils'
import { selectApp, updateActiveConnector, updateIsWaitingForOAuthResponse, } from '@/redux/slices/app'
import { useAvailableConnector, }                                             from '@/utils/connectors'
import Image                                                                  from 'next/image'
import Button                                                                 from '@/components/Button'
import { ArrowPathIcon, }                                                     from '@heroicons/react/24/solid'
import { useOAuthState, }                                                     from '@/utils/oauth'

type Props = {}

const DialogConnectorDetail: FC<Props> = () => {

  // const [cookies, setCookie] = useCookies(['oauthState'])

  const { activeConnector, isWaitingForOAuthResponse, } = useAppSelector(selectApp,)

  const { connector, isLoading, } = useAvailableConnector(activeConnector,)

  const { oauthState, mutate, } = useOAuthState(connector?.get('connectorId',) || null,)

  const dispatch = useAppDispatch()

  const handleClose = (): void => {
    dispatch(updateActiveConnector(null,),)
  }

  const handleConnectClick = () => {
    const _connect = async (): Promise<void> => {
      dispatch(updateIsWaitingForOAuthResponse(true,),)

      // Create a record on the instance to track the connection process
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connector?.get('connectorId',)}/`, {
        method  : 'POST',
        headers : {
          'Authorization' : `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type'  : 'application/json',
        },
      },)

      const json = await res.json()

      // console.log(json)

      if ('url' in json) {
        // Open the URL in a new tab
        const oauthWindow = window.open(json.url, '_blank',)

        // Start polling the instance server for the access token
        const poll = setInterval(async () => {

          const encodedConnectorId = encodeURIComponent(connector?.get('connectorId',) || '',)

          const url = `${process.env.NEXT_PUBLIC_API_URL}/oauth/?connector_id=${encodedConnectorId}`

          const getOAuthState = await fetch(url, {
            method  : 'GET',
            headers : {
              'Authorization' : `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          },)

          const getOAuthJson = await getOAuthState.json()

          if (!getOAuthState.ok || !getOAuthJson || getOAuthJson.length === 0) {
            throw new Error('Could not get connector',)
          }

          const oauthState = getOAuthJson[0]

          // If we have the access_token, close the window and stop polling
          if ('access_token' in oauthState && !!oauthState.access_token) {
            clearInterval(poll,)
            dispatch(updateIsWaitingForOAuthResponse(false,),)
            await mutate()
            oauthWindow?.close()
          }

        }, 1000,)
      }


    }

    _connect()
    // Ping the Re-Public API to create an OAuthState
    // Leave a key with the Re-Public API to use when reporting back
    // Re-Public API sends oauth data back to instance DB
    // This completes the process
  }

  return (
    <Dialog
      show={!!activeConnector}
      onClose={handleClose}
    >
      {
        connector && (
          <>
            {
              connector &&
              !!connector.get('image',) &&
              connector.get('image',).url() && (
                <Image
                  src={connector.get('image',).url()}
                  width={200}
                  height={200}
                  alt={connector.get('name',)}
                  className={'max-w-32 object-contain object-center'}
                />
              )
            }
            <h3>{connector.get('name',)}</h3>
            <p>{connector.get('description',)}</p>
            {
              oauthState && (
                <span>Connected</span>
              )

            }
            {
              !oauthState && (
                <Button
                  className={'flex flex-row justify-center items-center w-32 h-10'}
                  onClick={handleConnectClick}
                >
                  <>
                    {
                      isWaitingForOAuthResponse && (
                        <ArrowPathIcon className={'fa-spin text-white w-5'} />
                      )
                    }
                    {
                      !isWaitingForOAuthResponse && (
                        <span>Connect</span>
                      )
                    }
                  </>
                </Button>
              )
            }

          </>

        )
      }
    </Dialog>
  )
}

export default DialogConnectorDetail

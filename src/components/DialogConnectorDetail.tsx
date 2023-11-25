import { FC, }                                                                from 'react'
import Dialog                                                                 from '@/components/Dialog'
import { useAppDispatch, useAppSelector, }                                    from '@/utils'
import { selectApp, updateActiveConnector, updateIsWaitingForOAuthResponse, } from '@/redux/slices/app'
import { useActiveConnector, }                                                from '@/utils/connectors'
import Image                                                                  from 'next/image'
import Button                                                                 from '@/components/Button'
import { ArrowPathIcon, }                                                     from '@heroicons/react/24/solid'
import { useOAuthState, }                                                     from '@/utils/oauth'
import Link                                                                   from 'next/link'
import ConnectorOauthList                                                     from '@/components/ConnectorOauthList'
import { GoogleLogin, GoogleOAuthProvider, }                                  from '@react-oauth/google'

type Props = {}

const DialogConnectorDetail: FC<Props> = () => {

  // const [cookies, setCookie] = useCookies(['oauthState'])

  const { activeConnector, isWaitingForOAuthResponse, } = useAppSelector(selectApp,)

  const { connector, isLoading, } = useActiveConnector(activeConnector,)

  const { oauthState, mutate, } = useOAuthState(connector?.republic_id || null,)

  const dispatch = useAppDispatch()

  const handleClose = (): void => {
    dispatch(updateActiveConnector(null,),)
  }

  const handleConnectClick = () => {
    const _connect = async (): Promise<void> => {
      dispatch(updateIsWaitingForOAuthResponse(true,),)

      // Create a record on the instance to track the connection process
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connectors/${connector?.republic_id}/`, {
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

          const encodedConnectorId = encodeURIComponent(connector?.republic_id || '',)

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

  const handleButtonClick = (action: string,) => {
    const postAction = async (): Promise<void> => {
      const encodedConnectorId = encodeURIComponent(connector?.republic_id || '',)
      const url = `${process.env.NEXT_PUBLIC_API_URL}/connectors/${encodedConnectorId}`

      const res = await fetch(url, {
        method  : 'POST',
        headers : {
          'Authorization' : `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body : JSON.stringify({
          action,
        },),
        credentials : 'include',
      },)

      const json = await res.json()

      console.log(json,)
    }

    postAction()
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
              !!connector.svg &&
              connector.svg && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${connector.svg}`}
                  width={200}
                  height={200}
                  alt={connector.name}
                  className={'max-w-32 object-contain object-center mb-5'}
                />
              )
            }
            <h3>{connector.name}</h3>
            <p className={'mb-5'}>{connector.description}</p>
            {
              connector &&
              connector.oauths &&
              connector.oauths.length > 0 && (
                <ConnectorOauthList oauths={connector.oauths} />
              )
            }
            {
              connector.buttons &&
              connector.buttons.length > 0 && (
                !connector.oauths ||
                connector.oauths.length === 0
              ) &&
              connector.republic_id !== 'io.re-public.connector.google' &&
              connector.buttons.map((button, index,) => {
                if (button.url) {
                  return (
                    <Link
                      key={index}
                      href={button.url}
                      className={'block mb-5 outline-none active:outline-none focus:outline-none'}
                      target={'_blank'}
                    >
                      <Button
                        className={'flex flex-row justify-center items-center w-32 h-10'}
                      >
                        <span>{button.label}</span>
                      </Button>
                    </Link>
                  )
                }

                if (button.action) {
                  return (
                    <Button
                      className={'flex flex-row justify-center items-center w-32 h-10'}
                      key={index}
                      onClick={() => handleButtonClick(button.action as string,)}
                    >
                      <span>{button.label}</span>
                    </Button>
                  )
                }

                return null

              },)
            }
            {
              connector && (
                !connector.oauths ||
                connector.oauths.length === 0
              ) &&
              connector.republic_id === 'io.re-public.connector.google' && (
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={(credentialResponse,) => {
                      console.log(credentialResponse,)
                    }}
                    onError={() => {
                      console.log('Login Failed',)
                    }}
                  />
                </GoogleOAuthProvider>
              )
            }
            {/*{*/}
            {/*  oauthState && (*/}
            {/*    <span>Connected</span>*/}
            {/*  )*/}

            {/*}*/}
            {/*{*/}
            {/*  !oauthState && (*/}
            {/*    <Button*/}
            {/*      className={'flex flex-row justify-center items-center w-32 h-10'}*/}
            {/*      onClick={handleConnectClick}*/}
            {/*    >*/}
            {/*      <>*/}
            {/*        {*/}
            {/*          isWaitingForOAuthResponse && (*/}
            {/*            <ArrowPathIcon className={'fa-spin text-white w-5'} />*/}
            {/*          )*/}
            {/*        }*/}
            {/*        {*/}
            {/*          !isWaitingForOAuthResponse && (*/}
            {/*            <span>Connect</span>*/}
            {/*          )*/}
            {/*        }*/}
            {/*      </>*/}
            {/*    </Button>*/}
            {/*  )*/}
            {/*}*/}

          </>

        )
      }
    </Dialog>
  )
}

export default DialogConnectorDetail

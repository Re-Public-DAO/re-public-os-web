import Button                                  from '@/components/Button'
import { useAppDispatch, useAppSelector }      from '@/utils'
import { selectApp, updateIsConnectingDevice } from '@/redux/slices/app'
import { useEffect, useState }                 from 'react'
import { useRouter }                           from 'next/router'

const LinkDevice = () => {

  const [checkingIfAppIsInstalled, setCheckingIfAppIsInstalled] = useState(false)

  const {query} = useRouter()

  const dispatch = useAppDispatch()

  const handleConnectDeviceClick = () => {
    dispatch(updateIsConnectingDevice(true))
  }

  useEffect(() => {
    console.log('query', query)
    if (window && typeof window !== 'undefined' && !!query?.key) {
      const _deepLinkRedirect = async (): Promise<void> => {
        const deepLink = `re-public://devices/link/${query.key}`;
        console.log('deepLink', deepLink)

        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const delay = 500;
        const t = Date.now();

        setTimeout(function () {
          if (Date.now() - t < delay + 100) {
            // Here we need to link the device through the web or open up the app store
            // for the user to download
          }
        }, delay);

        if (iOS) {
          window.location.href = deepLink;
        } else {
          const a = document.createElement('a');
          a.setAttribute('href', deepLink);
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
        }
      }

      _deepLinkRedirect()
    }
  }, [])

  return (
    <div>
      <h1 className={'font-bold text-2xl mb-5'}>Linking Device</h1>
      <div
        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}
      >
        {
          query && (
            <span>{JSON.stringify(query)}</span>
          )
        }


      </div>
    </div>
  )
}

export default LinkDevice
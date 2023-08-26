import Image                        from 'next/image'
import { AppStoreListing, useApps } from '@/utils/apps'
import { useAppDispatch }           from '@/utils'
import { updateActiveApp }          from '@/redux/slices/app'


const Store = () => {

  const {isLoading: isAppStoreAppsLoading, apps: appStoreApps} = useApps()

  const dispatch = useAppDispatch()

  const handleAppClick = (app: AppStoreListing) => {
    dispatch(updateActiveApp(app.appStoreId))
  }

  return (
    <div>

      <h1 className={'font-bold text-2xl mb-5'}>App Store</h1>
      <div
        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}
      >
        {
          appStoreApps &&
          appStoreApps.length > 0 &&
          appStoreApps.map((app) => (
            <div
              key={app.id}
              className={'flex flex-col justify-between rounded-lg p-5 cursor-pointer max-w-sm shadow-2xl border border-gray-50 hover:bg-gray-50'}
              onClick={() => handleAppClick(app)}
            >
              <div className={'flex flex-col'}>
                <div
                  className={'relative w-full h-32 mb-5'}
                >
                  {
                    !!app.get('image') &&
                    app.get('image').url() && (
                      <Image
                        alt={`Image for Streamr`}
                        src={app.get('image').url()}
                        fill={true}
                        className={'w-full h-full object-contain'}
                      />
                    )
                  }

                </div>
                <span className={'font-bold mt-2'}>{app.get('name')}</span>
                <div className={'h-12'}>
                  <span className={'font-bold text-sm text-gray-600'}>{app.get('description')}</span>
                </div>
              </div>
              <div className={'flex flex-col font-mono mt-5'}>
                <div className={'mb-1'}>
                  {
                    !app.get('priceUsd') && (
                      <span>Free</span>
                    )
                  }
                  {
                    !!app.get('priceUsd') &&
                    typeof app.get('priceUsd') === 'number' && (
                      <span>${app.get('priceUsd')}</span>
                    )
                  }
                </div>
              </div>
            </div>

          ))
        }

      </div>


    </div>
  )
}

export default Store
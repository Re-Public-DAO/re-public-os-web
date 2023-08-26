import Image                 from 'next/image'
import {AppStoreListing}     from '@/utils/apps'
import { FunctionComponent } from 'react'
import { useAppDispatch }    from '@/utils'
import { updateActiveApp }   from '@/redux/slices/app'

type Props = {
  app: AppStoreListing
}

const AppStoreListing: FunctionComponent<Props> = ( {app}) => {

  const dispatch = useAppDispatch()

  const handleAppClick = (app: AppStoreListing) => {
    dispatch(updateActiveApp(app.appStoreId))
  }

  return (
     <div
      className={'flex flex-col justify-between rounded-lg p-5 cursor-pointer max-w-sm shadow-2xl border border-gray-50 hover:bg-gray-50'}
      onClick={() => handleAppClick(app)}
    >
      <div className={'flex flex-col'}>
        <div
          className={'relative w-full h-32 mb-5'}
        >
          {
            !!app.image &&
            app.image.url && (
              <Image
                alt={`Image for Streamr`}
                src={app.image.url}
                fill={true}
                className={'w-full h-full object-contain'}
              />
            )
          }

        </div>
        <span className={'font-bold mt-2'}>{app.name}</span>
        <div className={'h-12'}>
          <span className={'font-bold text-sm text-gray-600'}>{app.description}</span>
        </div>
      </div>
      <div className={'flex flex-col font-mono mt-5'}>
        <div className={'mb-1'}>
          {
            !app.priceUsd && (
              <span>Free</span>
            )
          }
          {
            !!app.priceUsd &&
            typeof app.priceUsd === 'number' && (
              <span>${app.priceUsd}</span>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AppStoreListing
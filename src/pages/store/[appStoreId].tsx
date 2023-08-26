import Button                               from '@/components/Button'
import Image                                from 'next/image'
import { useState }                         from 'react'
import { AppStoreListing, useApp, useApps } from '@/utils/apps'
import { useRouter }                        from 'next/router'


const AppStoreListingDetail = () => {

  const [installingAppId, setInstallingAppId] = useState<string | null>(null)

  const router = useRouter()

  const {isLoading, app} = useApp(router.query.appStoreId as string)




  return (
    <div className={'flex flex-col'}>
      {
        !isLoading && app && (
          <>
            {
              app.image &&
              app.image.url && (
                <div className={'relative w-32 h-32 mb-12'}>
                  <Image
                    src={app.image.url}
                    alt={app.name}
                    fill={true}
                    className={'w-full h-full object-contain max-w-sm inline-block'}
                  />

                </div>
              )
            }
            <h1 className={'font-bold text-2xl mb-5'}>{app.name}</h1>
            <p>{app.description}</p>
          </>
        )
      }



    </div>
  )
}

export default AppStoreListingDetail
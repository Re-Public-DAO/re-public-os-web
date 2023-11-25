import Image                  from 'next/image'
import { FunctionComponent, } from 'react'
import { useAppDispatch, }    from '@/utils'
import { updateActiveApp, }   from '@/redux/slices/app'
import ParseClient            from '@/utils/parseClient'

type Props = {
  app: ParseClient.Object
}

const MyApp: FunctionComponent<Props> = ( { app, },) => {

  const dispatch = useAppDispatch()

  const handleAppClick = (app: ParseClient.Object,) => {
    dispatch(updateActiveApp(app.get('appStoreId',),),)
  }

  return (
    <div
      className={'flex flex-row'}
      onClick={() => handleAppClick(app,)}
    >
      <div className={'w-1/4'}>
        {
          !!app.get('image',) &&
            app.get('image',).url() && (
            <div
              className={'relative w-24 h-24 rounded-lg shadow-lg'}
            >
              <Image
                src={app.get('image',).url()}
                fill={true}
                alt={app.get('name',)}
              />
            </div>
          )
        }

      </div>
      <div
        className={'flex flex-col w-3/4'}
      >
        <h3>{app.get('name',)}</h3>
      </div>

    </div>
  )
}

export default MyApp

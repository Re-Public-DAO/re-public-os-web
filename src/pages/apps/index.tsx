import { useApps, }                from '@/utils/apps'
import PageContainer               from '@/components/PageContainer'
import { GetServerSideProps, }     from 'next'
import StorageIcon                 from '@/assets/icons8-storage-100.svg'
import FolderIcon                  from '@/assets/icons8-mac-folder-100.svg'
import SettingsIcon                from '@/assets/icons8-settings-100.svg'
import Image, { StaticImageData, } from 'next/image'
import Link                        from 'next/link'


const appToIcon: Record<string, StaticImageData> = {
  'storage'  : StorageIcon,
  'browser'  : FolderIcon,
  'settings' : SettingsIcon,
}

const Apps = () => {

  const { isLoading, apps: installedApps, } = useApps(true,)



  return (
    <PageContainer>
      <h1 className={'font-bold text-2xl mb-5'}>My Apps</h1>
      <ul
        role={'list'}
        className={'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
      >
        {
          installedApps &&
          installedApps.length > 0 &&
          installedApps.map((app,) => (
            // <li
            //   key={app.id}
            //   className={'col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow'}
            // >
            //   <div className={'flex flex-1 flex-col p-8'}>
            //     <img className={'mx-auto h-32 w-32 flex-shrink-0 rounded-full'} src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'} alt={''} />
            //     <h3 className={'mt-6 text-sm font-medium text-gray-900'}>Jane Cooper</h3>
            //     <dl className={'mt-1 flex flex-grow flex-col justify-between'}>
            //       <dt className={'sr-only'}>Role</dt>
            //       <dd className={'mt-3'}>
            //         <span className={'inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'}>Admin</span>
            //       </dd>
            //     </dl>
            //   </div>
            // </li>
            <li
              key={app.id}
              className={'frosted-glass-container relative text-stone-500 w-32 h-32 cursor-pointer'}
            >
              <div
                className={'absolute frosted-glass w-full h-full shadow'}
              />
              <Link
                href={`/apps/${app.get('name',).toLowerCase()}`}
              >
                <div
                  className={'flex flex-col items-center justify-center absolute z-10 w-full h-full p-5 rounded bg-white bg-opacity-0 transition-bg-opacity hover:bg-opacity-100 duration-300'}
                >
                  <Image src={appToIcon[app.get('name',).toLowerCase()]} alt={'Storage app icon'} width={50} height={50} />
                  <h2>{app.get('name',)}</h2>

                </div>
              </Link>

            </li>


          ),)
        }
      </ul>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, },) => {

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/me`, {
  //   method  : 'GET',
  //   headers : {
  //     'Content-Type' : 'application/json',
  //     'Cookie'       : req.headers.cookie || '',
  //   },
  //   credentials : 'include',
  // },)
  //
  // console.log(res.status,)
  //
  // const json = await res.json()
  //
  // console.log(json,)

  return {
    props : {},
  }
}

export default Apps

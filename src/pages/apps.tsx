import { useApps, }            from '@/utils/apps'
import MyApp                   from '@/components/MyApp'
import PageContainer           from '@/components/PageContainer'
import { GetServerSideProps, } from 'next'
import fetch                   from 'cross-fetch'

const Apps = () => {

  const { isLoading, apps: installedApps, } = useApps(true,)



  return (
    <PageContainer>
      <h1 className={'font-bold text-2xl mb-5'}>My Apps</h1>
      <div
        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}
      >
        {
          installedApps &&
          installedApps.length > 0 &&
          installedApps.map((app,) => (
            <MyApp
              key={app.id}
              app={app}
            />

          ),)
        }
      </div>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, },) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/system/me`, {
    method  : 'GET',
    headers : {
      'Content-Type' : 'application/json',
      'Cookie'       : req.headers.cookie || '',
    },
    credentials : 'include',
  },)

  console.log(res.status,)

  const json = await res.json()

  console.log(json,)

  return {
    props : {},
  }
}

export default Apps

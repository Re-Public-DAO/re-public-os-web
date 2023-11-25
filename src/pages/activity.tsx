import PageContainer                     from '@/components/PageContainer'
import { GetServerSideProps, NextPage, } from 'next'
import Image                             from 'next/image'


const activities = [
  {
    id        : '1',
    createdAt : new Date(),
    action    : 'synced',
    actor     : 'Spotify',
    actorIcon : 'https://www.flaticon.com/svg/static/icons/svg/2111/2111624.svg',
    result    : 'success',
  },
]


const ActivityPage: NextPage = () => {




  return (
    <PageContainer>
      <h1 className={'font-bold text-2xl mb-5'}>Activity</h1>
      <ul
        className={'flex flex-col mt-12'}
      >
        {
          activities &&
          activities.length > 0 &&
          activities.map((activity,) => (
            <li
              key={activity.id}
              className={'flex flex-row items-center mb-5 rounded bg-white p-5 shadow-md hover:shadow-lg transition-shadow duration-300'}
            >
              <Image src={activity.actorIcon} alt={'icon'} width={10} height={10} />
              <span className={'ml-5'}>{activity.actor}</span>
              <span className={'ml-5'}>{activity.action}</span>
              <span className={'ml-5'}>{activity.result}</span>
            </li>
          ),)
        }
      </ul>
    </PageContainer>
  )
}

export default ActivityPage

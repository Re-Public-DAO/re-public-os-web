import Image   from 'next/image'
import { FC, } from 'react'

type Event = {
  id: string
  timestamp: number
  action?: string
  actor?: string
  actorIcon?: string
  result?: string
}

const SyncListItem: FC<{sync: Event}> = ({ sync, },) => {
  return (
    <li
      key={sync.id}
      className={'flex flex-row items-center mb-5 rounded bg-white p-5 shadow-md hover:shadow-lg transition-shadow duration-300'}
    >
      {/*<Image src={sync.actorIcon} alt={'icon'} width={10} height={10} />*/}
      <span className={'ml-5'}>{sync.actor}</span>
      <span className={'ml-5'}>{sync.action}</span>
      <span className={'ml-5'}>{sync.result}</span>
    </li>
  )
}

export default SyncListItem

import { FC, }    from 'react'
import DonutGraph from '@/components/Storage/DonutGraph'
import BarChart   from '@/components/Storage/BarChart'

const Storage: FC = () => {
  return (
    <div
      className={'flex flex-row gap-5'}
    >
      <div
        className={'w-64'}
      >
        <DonutGraph />
      </div>
      <div
        className={'flex flex-1 flex-row h-20'}
      >
        <BarChart />
      </div>
    </div>
  )
}

export default Storage

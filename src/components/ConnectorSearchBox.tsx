import React, { FunctionComponent, } from 'react'
import { MagnifyingGlassIcon, }      from '@heroicons/react/24/outline'

type Props = {}

const ConnectorSearchBox: FunctionComponent<Props> = () => {

  return (
    <div className={'relative'}>
      <MagnifyingGlassIcon
        className={'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4'}
      />
      <input
        type={'text'}
        className={'pl-10 pr-4 border-gray-100 focus:outline-none active:outline-none border-b w-full'}
        // value={value}
        // onChange={onChange}
        placeholder={'Search...'}
      />
    </div>
  )
}

export default ConnectorSearchBox

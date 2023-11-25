import React, { FC, PropsWithChildren, useContext, useEffect, useState, } from 'react'
import { FolderIcon, }                                                    from '@heroicons/react/24/outline'
import { BrowserContext, }                                                from '@/contexts/BrowserContext'

type Props = PropsWithChildren & {
    name: string
}

const CollapsibleFolder: FC<Props> = ({ name, children, },) => {
  const [ isCollapsed, setIsCollapsed, ] = useState(true,)

  const { fileViewerPath, } = useContext(BrowserContext,)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed,)
  }

  useEffect(() => {
    if (isCollapsed && fileViewerPath && fileViewerPath.startsWith(`/${name}`,)) {
      setIsCollapsed(false,)
    }
  }, [ fileViewerPath, name, ],)

  return (
    <div>
      <div onClick={toggleCollapse} className={'flex items-center cursor-pointer mb-2'}>
        <FolderIcon className={`h-5 w-5 ${isCollapsed ? 'text-gray-500' : 'text-blue-500'}`} />
        <span className={`ml-2 text-sm ${isCollapsed ? 'text-gray-700' : 'text-blue-500'}`}>{name}</span>
      </div>
      {!isCollapsed && <div className={'ml-6'}>{children}</div>}
    </div>
  )
}

export default CollapsibleFolder

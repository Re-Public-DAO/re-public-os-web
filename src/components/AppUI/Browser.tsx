import React, { FC, PropsWithChildren, ReactNode, } from 'react'
import { useFilesData, }                            from '@/utils/browser'
import CollapsibleFolder                            from '@/components/CollapsibleFolder'
import { File, }                                    from '@/utils/browser'
import { DocumentIcon, }                            from '@heroicons/react/24/outline'
import FileViewer                                   from '@/components/FileViewer'
import { useRouter, }                               from 'next/router'
import { BrowserProvider, }                         from '@/contexts/BrowserContext'
import FileListItem                                 from '@/components/FileListItem'

const Browser: FC = () => {

  const { filesData, } = useFilesData()

  const renderFileSystem = (files: File[], path = '',) => {
    // Recursive function to render the file system
    return files.map((file,) => {
      const currentPath = `${path}/${file.name}`
      if (file.type === 'folder') {
        return (
          <CollapsibleFolder key={currentPath} name={file.name}>
            {renderFileSystem(file.children, currentPath,)}
          </CollapsibleFolder>
        )
      } else {
        return (
          <FileListItem key={currentPath} file={file} />
        )
      }
    },)
  }

  if (!filesData) {
    return (
      <BrowserProvider>
        <></>
      </BrowserProvider>
    )
  }

  return (
    <BrowserProvider>
      <div
        className={'flex flex-row space-x-4'}
      >
        <div
          className={'w-1/3 col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow p-5 h-full'}
        >
          {renderFileSystem(filesData,)}
        </div>
        <FileViewer />
      </div>
    </BrowserProvider>
  )
}

export default Browser

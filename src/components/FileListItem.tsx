import { DocumentIcon, }      from '@heroicons/react/24/outline'
import React, { useContext, } from 'react'
import { File, }              from '@/utils/browser'
import { BrowserContext, }    from '@/contexts/BrowserContext'
import { isBrowser, }         from '@/utils'


const FileListItem = ({ file, }: { file: File },) => {

  const { updateFileViewerPath, } = useContext(BrowserContext,)

  const handleClick = () => {
    if (!isBrowser()) {
      return
    }
    const searchSegment = `?file=${file.path}`
    console.log(searchSegment,)
    if (window.location.href.includes(searchSegment,)) {
      // If the file is already selected, do nothing
      return
    }
    const url = new URL(window.location.href,)
    const fileParam = url.searchParams.get('file',)
    if (fileParam === file.path) {
      // If the file is already selected, do nothing
      return
    }
    url.searchParams.set('file', file.path,)

    // Update the URL without reloading the page
    window.history.replaceState(null, '', `?file=${file.path}`,)
    updateFileViewerPath(file.path,)
  }

  return (
    <div onClick={handleClick} className={'py-1 text-sm cursor-pointer text-gray-700 hover:text-blue-500'}>
      <DocumentIcon className={'h-5 w-5 text-gray-500 inline-block mr-2'} />
      <span>{file.name}</span>
    </div>
  )
}

export default FileListItem

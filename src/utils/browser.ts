import useSWR                                            from 'swr'
import { useCallback, useContext, useEffect, useState, } from 'react'
import { BrowserContext, }                               from '@/contexts/BrowserContext'
import { isBrowser, }                                    from '@/utils/index'

export type File = {
  name: string
  type: string
  path: string
  children: File[]
}

const sortFileSystem = (items: File[],) => {
  // Separate folders and files
  const folders = items.filter((item,) => item.type === 'folder',)
  const files = items.filter((item,) => item.type === 'file',)

  // Sort folders and files alphabetically
  const sortedFolders = folders.sort((a, b,) => a.name.localeCompare(b.name,),)
  const sortedFiles = files.sort((a, b,) => a.name.localeCompare(b.name,),)

  // Recursively sort contents of folders
  sortedFolders.forEach((folder,) => {
    if (folder.children && folder.children.length > 0) {
      folder.children = sortFileSystem(folder.children,)
    }
  },)

  // Combine sorted folders and files
  return [ ...sortedFolders, ...sortedFiles, ]
}

export const useFilesData = () => {
  const fetcherFiles = async (): Promise<File[] | null | undefined> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/io.re-public.app.browser/files/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    return sortFileSystem(json,)
  }

  const { data: filesData, isLoading, error, } = useSWR({
    key : 'files',
  }, fetcherFiles, )

  return {
    filesData,
  }
}

type FileContent = {
  content: string
}


export const useFileContent = () => {

  const { fileViewerPath, updateFileViewerPath, showFileViewer, } = useContext(BrowserContext,)

  const fetcherFileContents = async ({ innerPath, },): Promise<FileContent | null | undefined> => {
    if (!innerPath) {
      return null
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/io.re-public.app.browser/content/`, {
      method  : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        path : innerPath,
      },),
      mode        : 'cors',
      credentials : 'include',
    },)
    const json = await res.json()
    return json
  }

  const { data: fileContent, isLoading, error, } = useSWR({
    key       : `file${fileViewerPath}`,
    innerPath : fileViewerPath,
  }, fetcherFileContents, )

  const update = useCallback(() => {
    if (!isBrowser()) {
      return
    }
    console.log('update',)
    const url = new URL(window.location.href,)
    const filePath = url.searchParams.get('file',)
    updateFileViewerPath(filePath,)
  }, [ updateFileViewerPath, ],)

  useEffect(() => {
    if (!isBrowser() || !showFileViewer) {
      return
    }

    if (window.location.search && window.location.search.includes('file=',)) {
      update()
    }
  }, [ showFileViewer, updateFileViewerPath, ],)

  useEffect(() => {

    update()
  }, [],)

  return {
    fileContent,
  }
}

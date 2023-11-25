import { createContext, FC, PropsWithChildren, useState, } from 'react'

type BrowserContextType = {
  fileViewerPath: string | null
  showFileViewer: boolean
  updateFileViewerPath: (newPath: string | null) => void
  updateShowFileViewer: (value: boolean) => void
}

export const BrowserContext = createContext<BrowserContextType>({
  fileViewerPath       : null,
  showFileViewer       : false,
  updateFileViewerPath : () => {},
  updateShowFileViewer : () => {},
},)

export const BrowserProvider: FC<PropsWithChildren> = ({ children, },) => {
  const [ fileViewerPath, setFileViewerPath, ] = useState<string | null>(null,)
  const [ showFileViewer, setShowFileViewer, ] = useState<boolean>(false,)

  const updateFileViewerPath = (newPath: string | null,) => {
    if (fileViewerPath === newPath) {
      return
    }
    setFileViewerPath(newPath,)
  }

  const updateShowFileViewer = (value: boolean,) => {
    if (showFileViewer === value) {
      return
    }
    setShowFileViewer(value,)
  }

  return (
    <BrowserContext.Provider value={{ fileViewerPath, showFileViewer, updateFileViewerPath, updateShowFileViewer, }}>
      {children}
    </BrowserContext.Provider>
  )
}

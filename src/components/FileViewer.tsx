import React, { FC, useContext, useEffect, } from 'react'
import { Prism as SyntaxHighlighter, }       from 'react-syntax-highlighter'
import AtomDark                              from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import { useFileContent, }                   from '@/utils/browser'
import { BrowserContext, }                   from '@/contexts/BrowserContext' // Import the custom hook


const FileViewer: FC = () => {
  const { fileContent, } = useFileContent()

  console.log(fileContent,)

  const { showFileViewer, fileViewerPath, updateShowFileViewer, } = useContext(BrowserContext,)

  useEffect(() => {
    if (fileViewerPath && !showFileViewer) {
      // If the fileViewerPath is set but the file viewer is not shown, show it
      updateShowFileViewer(true,)
    }
  }, [ fileViewerPath, showFileViewer, updateShowFileViewer, ],)

  const getContent = (innerContent: string,) => {
    if (innerContent.length > 5000) {
      return innerContent.substring(0, 5000,)
    }
    return innerContent
  }

  return (
    <div
      className={`w-2/3 col-span-2 rounded-lg ${!showFileViewer ? 'invisible' : 'visible'}`}
    >
      <SyntaxHighlighter
        language={'javascript'}
        style={AtomDark}
        className={'!font-mono text-sm !my-0'}
      >
        {fileContent ? getContent(fileContent.content,) : ''}
      </SyntaxHighlighter>

    </div>
  )
}

export default FileViewer

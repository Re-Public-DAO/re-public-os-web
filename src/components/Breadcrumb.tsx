import { FC, useEffect, useState, } from 'react'
import { useRouter, }               from 'next/router'
import Link                         from 'next/link'

const Breadcrumb: FC = () => {

  const [ firstSegment, setFirstSegment, ] = useState<string | null>(null,)
  const [ secondSegment, setSecondSegment, ] = useState<string | null>(null,)

  const { asPath, } = useRouter()

  useEffect(() => {

    if (!asPath) {
      return
    }

    // Regex to match the first two segments
    const match = asPath.match(/^\/([^/]+)\/([^/?]+)/,)

    if (!match || match.length === 1) {
      return
    }

    if (match[1]) {
      setFirstSegment(match[1],)
    }

    if (match[2]) {
      setSecondSegment(match[2],)
    }


  }, [ asPath, ],)


  return (
    <nav className={'flex mb-8 h-8'} aria-label={'Breadcrumb'}>
      <ol role={'list'} className={'flex items-center space-x-4'}>
        <li>
          <div className={'flex items-center'}>
            {
              firstSegment &&
              secondSegment && (
                <Link
                  href={`/${firstSegment}`}
                  className={'text-sm font-medium text-blue-500 hover:text-blue-700 capitalize'}
                >
                  {firstSegment}
                </Link>
              )
            }
          </div>
        </li>
        {
          firstSegment &&
          secondSegment && (
            <li>
              <div className={'flex items-center'}>
                <svg className={'h-5 w-5 flex-shrink-0 text-gray-300'} fill={'currentColor'} viewBox={'0 0 20 20'} aria-hidden={'true'}>
                  <path d={'M5.555 17.776l8-16 .894.448-8 16-.894-.448z'} />
                </svg>
                <span className={'ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 capitalize'} aria-current={'page'}>{secondSegment}</span>
              </div>
            </li>
          )
        }
      </ol>
    </nav>
  )
}

export default Breadcrumb

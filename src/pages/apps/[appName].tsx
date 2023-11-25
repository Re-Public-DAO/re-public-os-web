import { NextPage, }                from 'next'
import PageContainer                from '@/components/PageContainer'
import { useRouter, }               from 'next/router'
import Storage                      from '@/components/AppUI/Storage'
import Browser                      from '@/components/AppUI/Browser'
import { FC, ReactNode, }           from 'react'
import ErrorPage                    from 'next/error'
import { isBrowser, useIsMounted, } from '@/utils'


const AppDetailPage: NextPage = () => {

  const appNameToUI: Record<string, FC> = {
    storage  : Storage,
    settings : () => (<div></div>),
    browser  : Browser,
  }

  const validAppNames = Object.keys(appNameToUI,)

  const { query, } = useRouter()

  const isMounted = useIsMounted()

  const renderAppUI = (): ReactNode => {
    const Component = appNameToUI[query.appName as string]
    if (!isBrowser() || !isMounted || !Component) {
      return <></>
    }
    return (
      <Component />
    )
  }

  if (isBrowser() && isMounted && query.appName && !validAppNames.includes(query.appName as string,)) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageContainer>
      <h1 className={'capitalize'}>{query.appName}</h1>
      {renderAppUI()}
    </PageContainer>
  )
}

export default AppDetailPage

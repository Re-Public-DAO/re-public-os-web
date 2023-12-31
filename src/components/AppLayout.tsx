import React, { FunctionComponent, HTMLAttributes, useEffect, } from 'react'
import Head                                                     from 'next/head'
import DialogAppDetail                                          from '@/components/DialogAppDetail'
import DialogConnectorDetail                                    from '@/components/DialogConnectorDetail'
import DialogConnectDevice                                      from '@/components/DialogConnectDevice'
import localFont                                                from 'next/font/local'
import { Manrope, Work_Sans, Space_Mono, }                      from 'next/font/google'
import AuthChecker                                              from '@/components/AuthChecker'
import { useLoggedInUser, }                                     from '@/utils/users'
import DialogAddConnector                                       from '@/components/DialogAddConnector'
import PrimaryNav                                               from '@/components/PrimaryNav'

const visby = localFont({
  src      : '../../public/fonts/Visby.woff',
  variable : '--font-visby',
},)

const manrope = Manrope({
  subsets  : [ 'latin', ],
  variable : '--font-manrope',
  weight   : [ '400', '700', ],
},)

const workSans = Work_Sans({
  subsets  : [ 'latin', ],
  variable : '--font-work-sans',
  // weights: ['400', '700'],
},)

const spaceMono = Space_Mono({
  subsets  : [ 'latin', ],
  variable : '--font-space-mono',
  weight   : [ '400', '700', ],
},)


type Props = HTMLAttributes<HTMLDivElement> & {}

const AppLayout: FunctionComponent<Props> = ({ children, },) => {

  const { user, } = useLoggedInUser()

  // We need these to be on the body tag so that the fonts are available to the
  // Dialogs, which are rendered outside of the main app. next/font is not
  // allowed in _document.tsx
  useEffect(() => {
    document.body.classList.add(visby.variable,)
    document.body.classList.add(manrope.variable,)
    document.body.classList.add(workSans.variable,)
    document.body.classList.add(spaceMono.variable,)

    return () => {
      document.body.classList.remove(visby.variable,)
      document.body.classList.remove(manrope.variable,)
      document.body.classList.remove(workSans.variable,)
      document.body.classList.remove(spaceMono.variable,)
    }
  }, [],)

  return (
    <div className={'flex flex-col justify-between h-full'}>
      <Head>
        <title>Re-Public</title>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </Head>

      <AuthChecker />

      <div className={'flex flex-row h-full'}>

        {
          user && (
            <PrimaryNav />
          )
        }

        <main className={'flex flex-col flex-grow pt-12 md:pt-12 pr-16 md:w-2/3 md:mx-auto'}>
          {children}
        </main>

      </div>



      {/*<footer className={'flex flex-row justify-center items-center py-8 bg-gray-100'}>*/}

      {/*</footer>*/}

      <DialogAppDetail />

      <DialogConnectorDetail />

      <DialogConnectDevice />

      {/*<DialogAddConnector />*/}
    </div>
  )
}

export default AppLayout

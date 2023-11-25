import 'tailwindcss/tailwind.css'
import '../styles/global.css'

// Redux
import { Provider, } from 'react-redux'
import store         from '../redux'
import AppLayout     from '../components/AppLayout'

import { CookiesProvider, } from 'react-cookie'

import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient, } from '@/utils'


const RepublicOsApp = ( { Component, pageProps, }, ) => {


  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CookiesProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </CookiesProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default RepublicOsApp

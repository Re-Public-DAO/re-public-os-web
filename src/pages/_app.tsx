import 'tailwindcss/tailwind.css'
import '../styles/global.css'

// Redux
import { Provider, } from 'react-redux'
import store         from '../redux'
import AppLayout               from '../components/AppLayout'

import {CookiesProvider} from 'react-cookie'


const RepublicOsApp = ( {Component, pageProps} ) => {


  return (
    <Provider store={store}>
      <CookiesProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </CookiesProvider>
    </Provider>
  )
}

export default RepublicOsApp

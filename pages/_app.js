import { Provider, useSelector } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import SimpleReactLightbox from 'simple-react-lightbox'
import PrivateLayout from '../components/Layout/privateLayout'
import Loader from '../components/UI/BackdropLoader'
import Snackbar from '../components/UI/Snackbar'
import SocketEventListener from '../components/SocketEventListener'
import store from '../store'
import '../styles/globals.css'
import '../styles/checkbox.module.css'
import '../styles/accordian.css'
import '../styles/Tabs.css'
import '../styles/style.js'
import '../utilities/axiosConfig'
import ScrollToTop from '../components/ScrollToTop'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

function LoadingComponent() {
  const loadingState = useSelector((state) => state.root.auth.loading)
  const socketObj = useSelector((state) => state.root.socket.socketObj)
  return (
    <>
      <Snackbar />
      {loadingState ? <Loader open={loadingState} /> : null}
      {socketObj ? <SocketEventListener socketObj={socketObj} /> : null}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handlePixel = (url) => {
      import('react-facebook-pixel')
      .then(module => module.default)
      .then(ReactPixel => {
        ReactPixel.init('388190652126926')
        ReactPixel.pageView() // For tracking page view
      })
    }
    const handleRouteChange = (url) => {
      gtag.pageview(url)
      handlePixel();
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <Provider store={store}>
      <SimpleReactLightbox>
        <PrivateLayout>
          <ScrollToTop />
          <LoadingComponent />
          <Component {...pageProps} />
        </PrivateLayout>
      </SimpleReactLightbox>
    </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
}

export default appWithTranslation(MyApp)

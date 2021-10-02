import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as gtag from '../lib/analytics'
import { AppContextProvider } from '../src/web/contexts/appContexts'

import '../styles/globals.css'

function VideoRead({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
export default VideoRead

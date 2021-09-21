import type { AppProps } from 'next/app'

import { AppContextProvider } from '../src/web/contexts/appContexts'

import '../styles/globals.css'

function VideoRead({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
export default VideoRead

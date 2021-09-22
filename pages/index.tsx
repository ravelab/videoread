import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useContext } from 'react'

import VideoPlayer from '../src/web/components/VideoPlayer/VideoPlayer'
import NoteList from '../src/web/components/NoteList/NoteList'
import PlayList from '../src/web/components/PlayList/PlayList'
import { actions, AppContext } from '../src/web/contexts/appContexts'

import styles from '../styles/Home.module.css'

// eslint-disable-next-line
export async function getServerSideProps(context: any) {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  )

  return {
    props: {
      deviceType: isMobile ? 'mobile' : 'desktop',
    },
  }
}

interface HomeProps {
  deviceType: string
}

const Home: NextPage<HomeProps> = ({ deviceType }) => {
  const [, dispatchToAppState] = useContext(AppContext)

  useEffect(() => {
    dispatchToAppState({ type: actions.SET_DEVICE_TYPE, payload: deviceType })
  }, [deviceType, dispatchToAppState])

  return (
    <div>
      <Head>
        <title>VideoRead</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta name="description" content="the best way to learn from videos" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>

      <main
        className={deviceType === 'mobile' ? styles.mainMobile : styles.main}
      >
        <VideoPlayer />
        <NoteList deviceType={deviceType} />
        <PlayList />
      </main>
    </div>
  )
}

export default Home

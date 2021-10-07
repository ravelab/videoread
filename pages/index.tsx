import type { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import VideoPlayer from '../src/web/components/VideoPlayer/VideoPlayer'
import NoteList from '../src/web/components/NoteList/NoteList'
import WatchHistory from '../src/web/components/WatchHistory/WatchHistory'
import { actions, AppContext } from '../src/web/contexts/appContexts'
import {
  saveVideosIfNeeded,
  saveNotesIfNeeded,
  loadVideos,
  loadNotes,
} from '../src/web/services/storage'
import { GA_TRACKING_ID } from '../lib/analytics'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [
    { videos, notes, currentVideoId, videosLoaded, notesLoaded },
    dispatchToAppState,
  ] = useContext(AppContext)
  const {
    isReady,
    query: { v, t },
  } = useRouter()

  // save videos
  useEffect(() => {
    if (videosLoaded) {
      saveVideosIfNeeded(videos)
    }
  }, [videos, videosLoaded])

  // save notes
  useEffect(() => {
    if (currentVideoId && notesLoaded) {
      saveNotesIfNeeded(notes, currentVideoId)
    }
  }, [notes, currentVideoId, notesLoaded])

  // load videos
  useEffect(() => {
    if (!videosLoaded) {
      dispatchToAppState({
        type: actions.LOAD_VIDEOS,
        payload: loadVideos(),
      })
    }
  }, [dispatchToAppState, videosLoaded])

  // load notes
  useEffect(() => {
    if (!notesLoaded && currentVideoId) {
      dispatchToAppState({
        type: actions.LOAD_NOTES,
        payload: loadNotes(currentVideoId),
      })
    }
  }, [currentVideoId, notesLoaded, dispatchToAppState])

  // play specified video
  useEffect(() => {
    if (v) {
      dispatchToAppState({ type: actions.PLAY_VIDEO, payload: v as string })
    }
  }, [dispatchToAppState, v])

  // video seek
  useEffect(() => {
    if (t) {
      dispatchToAppState({
        type: actions.SEEK_TO,
        payload: Number(t),
      })
    }
  }, [dispatchToAppState, t])

  // play the most recent video
  useEffect(() => {
    if (isReady && !v) {
      const videoId = videos.length > 0 ? videos[0].id : '2uUQTExOoVM' // the tutorial video
      Router.push(`/?v=${videoId}`)
    }
  }, [dispatchToAppState, isReady, v, t, videos])

  return (
    <>
      <Head>
        <title>VideoRead - Take good notes from videos</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="the best way to learn from videos" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', '${GA_TRACKING_ID}', {
                          page: window.location.pathname
                      });`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w) {
                var s = document.createElement('script');
                s.src = 'https://survey.survicate.com/workspaces/12f83352e0b9022d0c6881d1e15d995f/web_surveys.js';
                s.async = true;
                var e = document.getElementsByTagName('script')[0];
                e.parentNode.insertBefore(s, e);
              })(window);`,
          }}
        />
      </Head>

      <main className={styles.main}>
        <NoteList />
        <VideoPlayer />
        <WatchHistory />
      </main>
    </>
  )
}

export default Home

import type { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
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
    if (isReady && !v && videos.length > 0) {
      Router.push(`/?v=${videos[0].id}`)
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
      </Head>

      <main className={styles.main}>
        <NoteList />
        <VideoPlayer />
        <WatchHistory />
      </main>
      <Script
        id="_informizely_script_tag"
        dangerouslySetInnerHTML={{
          __html: `
            var IzWidget = IzWidget || {};
            (function (d) {
              var scriptElement = d.createElement('script');
              scriptElement.type = 'text/javascript'; scriptElement.async = true;
              scriptElement.src = "https://insitez.blob.core.windows.net/site/9036e24c-aaeb-4d69-9d21-4d80b244702e.js";
              var node = d.getElementById('_informizely_script_tag');
              node.parentNode.insertBefore(scriptElement, node);
            })(document);`,
        }}
      />
    </>
  )
}

export default Home

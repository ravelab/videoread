import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useContext } from 'react'
import throttle from 'lodash/throttle'

import VideoPlayer from '../src/web/components/VideoPlayer/VideoPlayer'
import NoteList from '../src/web/components/NoteList/NoteList'
import WatchHistory from '../src/web/components/WatchHistory/WatchHistory'
import { actions, AppContext } from '../src/web/contexts/appContexts'
import { NoteType, VideoType } from '../src/web/types'

import styles from '../styles/Home.module.css'

const saveVideosIfNeeded = throttle((videos: VideoType[]) => {
  const videosJson = JSON.stringify(videos)
  const storageVideosJson = localStorage.getItem('videos')
  if (videosJson !== storageVideosJson) {
    //console.log("setItem('videos': ", videosJson)
    localStorage.setItem('videos', videosJson)
  }
}, 5000)

const saveNotesIfNeeded = throttle(
  (notes: NoteType[], currentVideoId: string) => {
    const key = `notes-${currentVideoId}`
    const notesJson = JSON.stringify(notes)
    const storageNotesJson = localStorage.getItem(key)
    if (notesJson !== storageNotesJson) {
      //console.log('setItem(', key, notesJson)
      localStorage.setItem(key, notesJson)
    }
  },
  5000
)

const Home: NextPage = () => {
  const [
    { videos, notes, currentVideoId, videosLoaded, notesLoaded },
    dispatchToAppState,
  ] = useContext(AppContext)

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
      const storageVideosJson = localStorage.getItem('videos') || '[]'
      let payload: VideoType[] = []
      try {
        payload = JSON.parse(storageVideosJson)
      } catch (e) {}
      dispatchToAppState({
        type: actions.LOAD_VIDEOS,
        payload,
      })
    }
  }, [dispatchToAppState, videosLoaded])

  // load notes
  useEffect(() => {
    if (!notesLoaded && currentVideoId) {
      const storageNotesJson =
        localStorage.getItem(`notes-${currentVideoId}`) || '[]'
      let payload: VideoType[] = []
      try {
        payload = JSON.parse(storageNotesJson)
      } catch (e) {}
      dispatchToAppState({
        type: actions.LOAD_NOTES,
        payload,
      })
    }
  }, [currentVideoId, notesLoaded, dispatchToAppState])

  // play the most recent video
  useEffect(() => {
    if (videos.length > 0) {
      dispatchToAppState({ type: actions.PLAY_VIDEO, payload: videos[0].id })
    }
  }, [videos, dispatchToAppState])

  return (
    <div>
      <Head>
        <title>VideoRead</title>
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
    </div>
  )
}

export default Home

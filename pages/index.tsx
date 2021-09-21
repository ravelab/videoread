import type { NextPage } from 'next'
import Head from 'next/head'

import VideoPlayer from '../src/web/components/VideoPlayer/VideoPlayer'
import NoteList from '../src/web/components/NoteList/NoteList'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VideoRead</title>
        <meta name="description" content="the best way to learn from videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <VideoPlayer />
        <NoteList />
      </main>
    </div>
  )
}

export default Home

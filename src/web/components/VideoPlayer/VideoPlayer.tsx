import { useContext, useEffect } from 'react'
import YouTube, { Options } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'

import Menu from '../Menu/Menu'
import { actions, AppContext } from '../../contexts/appContexts'
import { VideoType } from '../../types'

import styles from './VideoPlayer.module.css'

const opts: Options = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    rel: 0,
    controls: 1,
    modestbranding: 1,
    enablejsapi: 1,
  },
}

const VideoPlayer = (): JSX.Element => {
  const [{ currentVideoId, seekTo, player }, dispatchToAppState] =
    useContext(AppContext)

  useEffect(() => {
    if (seekTo !== undefined) {
      player?.seekTo(seekTo, true)
    }
  }, [player, seekTo])

  const handleReady = (event: { target: YouTubePlayer }) => {
    dispatchToAppState({ type: actions.SET_PLAYER, payload: event.target })
    event.target.playVideo()
  }

  const handlePlay = (event: { target: YouTubePlayer }) => {
    if (seekTo !== undefined) {
      dispatchToAppState({ type: actions.CLEAR_SEEK_TO })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const info = (event.target as any).getVideoData()
      const video: VideoType = {
        id: info.video_id,
        title: info.title,
        lastWatched: new Date().getTime(),
      }
      dispatchToAppState({ type: actions.UPSERT_VIDEO, payload: video })
    }
  }

  return (
    <div className={styles.videoPlayerContainer}>
      {currentVideoId && (
        <div className={styles.autoResizableIframe}>
          <YouTube
            videoId={currentVideoId}
            opts={opts}
            onReady={handleReady}
            onPlay={handlePlay}
          />
        </div>
      )}
      <Menu />
    </div>
  )
}

export default VideoPlayer

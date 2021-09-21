import { useContext, useEffect } from 'react'
import YouTube, { Options } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'

import { actions, AppContext } from '../../contexts/appContexts'

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
  const [{ videos, seekTo, player }, dispatchToAppState] =
    useContext(AppContext)

  const onReady = (event: { target: YouTubePlayer }) => {
    dispatchToAppState({ type: actions.SET_PLAYER, payload: event.target })
    // access to player in all event handlers via event.target
    event.target.playVideo()
  }

  useEffect(() => {
    if (seekTo !== null) {
      player?.seekTo(seekTo, true)
      dispatchToAppState({ type: actions.CLEAR_SEEK_TO })
    }
  }, [dispatchToAppState, player, seekTo])

  // getVideoInfo is obsolete
  // https://github.com/orizens/ngx-youtube-player/issues/20
  // new way: http://www.youtube.com/get_video_info?video_id={id}

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div className={styles.autoResizableIframe}>
        <YouTube videoId={videos[0].id} opts={opts} onReady={onReady} />
      </div>
    </div>
  )
}

export default VideoPlayer

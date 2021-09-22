import { useContext, useEffect } from 'react'
import YouTube, { Options } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import TextField from '@mui/material/TextField'

import { actions, AppContext } from '../../contexts/appContexts'

import styles from './VideoPlayer.module.css'
import { VideoType } from '../../types'

const youTubeGetID = (url: string) => {
  const [a, , b] = url
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if (b !== undefined) {
    return b.split(/[^0-9a-z_-]/i)[0]
  } else {
    return a
  }
}

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
  const [{ currentVideoId, seekTo, player, deviceType }, dispatchToAppState] =
    useContext(AppContext)

  const onReady = (event: { target: YouTubePlayer }) => {
    dispatchToAppState({ type: actions.SET_PLAYER, payload: event.target })
    event.target.playVideo()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log('info: ', (event.target as any).getVideoData())
    const info = (event.target as any).getVideoData()
    const video: VideoType = {
      id: info.video_id,
      title: info.title,
      lastWatched: new Date().toISOString(),
    }
    dispatchToAppState({ type: actions.ADD_VIDEO, payload: event.target })
  }

  useEffect(() => {
    if (seekTo !== undefined) {
      player?.seekTo(seekTo, true)
      dispatchToAppState({ type: actions.CLEAR_SEEK_TO })
    }
  }, [dispatchToAppState, player, seekTo])

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const url = e.clipboardData.getData('text/plain')
    const videoId = youTubeGetID(url)
    dispatchToAppState({ type: actions.PLAY_VIDEO, payload: videoId })
  }

  const urlPasteArea = (
    <TextField
      style={{
        width: deviceType === 'mobile' ? '60%' : '30%',
        padding: 4,
      }}
      variant="outlined"
      placeholder="Paste YouTube URL Here"
      inputProps={{ onPaste }}
      value=""
    />
  )

  return (
    <div
      style={{
        width: deviceType === 'mobile' ? '100%' : 'calc(100% - 380px)',
      }}
    >
      {deviceType === 'mobile' && urlPasteArea}
      {currentVideoId && (
        <div className={styles.autoResizableIframe}>
          <YouTube videoId={currentVideoId} opts={opts} onReady={onReady} />
        </div>
      )}
      {deviceType !== 'mobile' && urlPasteArea}
    </div>
  )
}

export default VideoPlayer

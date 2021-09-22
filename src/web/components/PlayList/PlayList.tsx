import { useContext, useEffect } from 'react'

import { actions, AppContext } from '../../contexts/appContexts'
import { VideoType } from '../../types'

const localStorageVideos: VideoType[] = [
  {
    id: 'mYcLuWHzfmE',
    lastWatched: 'date',
  },
]

const PlayList = (): JSX.Element => {
  const [{ videos }, dispatchToAppState] = useContext(AppContext)

  useEffect(() => {
    if (videos.length > 0) {
      dispatchToAppState({ type: actions.PLAY_VIDEO, payload: videos[0].id })
    } else {
      dispatchToAppState({
        type: actions.SET_VIDEOS,
        payload: localStorageVideos,
      })
    }
  }, [videos, dispatchToAppState])

  return <div></div>
}

export default PlayList

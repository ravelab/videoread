import { useContext } from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import Video from '../Video/Video'
import { actions, AppContext } from '../../contexts/appContexts'
import { VideoType } from '../../types'

import styles from './WatchHistory.module.css'

const WatchHistory = (): JSX.Element => {
  const [{ openWatchHistory, videos }, dispatchToAppState] =
    useContext(AppContext)

  const handleClose = () => {
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: false })
  }

  return (
    <Modal open={openWatchHistory} onClose={handleClose}>
      <div className={styles.watchHistoryContainer}>
        <Typography className={styles.header} variant="h6">
          Watch History:
        </Typography>
        {videos.length > 0 ? (
          videos.map((video) => <Video key={video.id} video={video} />)
        ) : (
          <Video
            video={
              {
                title: 'No videos. Add videos by pasting YouTube URLs',
              } as VideoType
            }
          />
        )}
      </div>
    </Modal>
  )
}

export default WatchHistory

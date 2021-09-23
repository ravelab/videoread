import { useContext } from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import Video from '../Video/Video'
import { actions, AppContext } from '../../contexts/appContexts'
import { VideoType } from '../../types'

const WatchHistory = (): JSX.Element => {
  const [{ deviceType, openWatchHistory, videos }, dispatchToAppState] =
    useContext(AppContext)

  const handleClose = () => {
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: false })
  }

  return (
    <Modal open={openWatchHistory} onClose={handleClose}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ddd',
          outline: 'none',
          width: deviceType === 'mobile' ? '90%' : 480,
          overflowY: 'auto',
          maxHeight: deviceType === 'mobile' ? '20vh' : '100vh',
        }}
      >
        <Typography
          style={{ margin: '10px 0 0 16px', color: 'darkslategray' }}
          variant="h6"
        >
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

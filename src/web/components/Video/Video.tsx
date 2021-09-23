import { useContext } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import { AppContext, actions } from '../../contexts/appContexts'
import { VideoType } from '../../types'

import styles from './Video.module.css'

interface VideoProps {
  video: VideoType
}

const Video: React.FC<VideoProps> = ({ video }) => {
  const [, dispatchToAppState] = useContext(AppContext)

  const handleTitleClick = () => {
    if (video.id) {
      dispatchToAppState({ type: actions.PLAY_VIDEO, payload: video.id })
    }
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: false })
  }

  const handleDeleteClick = () => {
    dispatchToAppState({ type: actions.DELETE_VIDEO, payload: video.id })
  }

  return (
    <Card className={styles.card}>
      <Button className={styles.titleContainer} onClick={handleTitleClick}>
        <Typography fontSize="large">{video.title}</Typography>
      </Button>
      {video.id && (
        <IconButton onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Card>
  )
}

export default Video

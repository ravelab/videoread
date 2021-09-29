import { useContext } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'

import { AppContext, actions } from '../../contexts/appContexts'
import { VideoType } from '../../types'

const Title = styled(Button)(() => ({
  textTransform: 'none',
  width: '100%',
  color: 'darkslategray',
}))

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  margin: '8px 16px',
}))

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
    <StyledCard>
      <Title onClick={handleTitleClick}>
        <Typography fontSize="large">{video.title}</Typography>
      </Title>
      {video.id && (
        <IconButton onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </StyledCard>
  )
}

export default Video

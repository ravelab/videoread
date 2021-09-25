import { useContext } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import HistoryIcon from '@mui/icons-material/History'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

import { actions, AppContext } from '../../contexts/appContexts'

import styles from './Menu.module.css'

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

const Menu = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width:799px)')
  const [{ videos, currentVideoId }, dispatchToAppState] =
    useContext(AppContext)

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const url = e.clipboardData.getData('text/plain')
    const videoId = youTubeGetID(url)
    dispatchToAppState({ type: actions.PLAY_VIDEO, payload: videoId })
  }

  const handleHistoryClick = () => {
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: true })
  }

  const { title } = videos.find((video) => video.id === currentVideoId) || {}

  const titleDisplay = title && (
    <Typography className={styles.title} variant="h6">
      {title}
    </Typography>
  )

  return (
    <div>
      <div className={styles.menuContainer}>
        <IconButton onClick={handleHistoryClick}>
          <HistoryIcon fontSize="large" />
        </IconButton>
        <TextField
          className={styles.pasteArea}
          variant="outlined"
          placeholder="Paste YouTube URL here"
          inputProps={{
            onPaste: handlePaste,
            className: styles.input,
          }}
          value=""
        />
        {!isMobile && titleDisplay}
      </div>
      {isMobile && titleDisplay}
      <Typography className={styles.slogan} variant="h5">
        VideoRead - Take good notes from videos
      </Typography>
    </div>
  )
}

export default Menu

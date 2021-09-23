import { useContext } from 'react'
import TextField from '@mui/material/TextField'
import HistoryIcon from '@mui/icons-material/History'
import IconButton from '@mui/material/IconButton'

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
  const [, dispatchToAppState] = useContext(AppContext)

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const url = e.clipboardData.getData('text/plain')
    const videoId = youTubeGetID(url)
    dispatchToAppState({ type: actions.PLAY_VIDEO, payload: videoId })
  }

  const handleHistoryClick = () => {
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: true })
  }

  return (
    <div className={styles.menuContainer}>
      <IconButton onClick={handleHistoryClick}>
        <HistoryIcon fontSize="large" />
      </IconButton>
      <TextField
        className={styles.pasteArea}
        variant="outlined"
        placeholder="Paste YouTube URL Here"
        inputProps={{
          onPaste: handlePaste,
          className: styles.input,
        }}
        value=""
      />
    </div>
  )
}

export default Menu

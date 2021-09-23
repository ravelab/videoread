import { useContext } from 'react'
import TextField from '@mui/material/TextField'
import HistoryIcon from '@mui/icons-material/History'
import IconButton from '@mui/material/IconButton'

import { actions, AppContext } from '../../contexts/appContexts'

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
  const [{ deviceType }, dispatchToAppState] = useContext(AppContext)

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const url = e.clipboardData.getData('text/plain')
    const videoId = youTubeGetID(url)
    dispatchToAppState({ type: actions.PLAY_VIDEO, payload: videoId })
  }

  const handleHistoryClick = () => {
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: true })
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <IconButton onClick={handleHistoryClick}>
        <HistoryIcon fontSize="large" />
      </IconButton>
      <TextField
        style={{
          width: '224px',
          padding: 4,
        }}
        variant="outlined"
        placeholder="Paste YouTube URL Here"
        inputProps={{
          onPaste,
          style: {
            padding:
              deviceType === 'mobile' ? '10px 14px 10px' : '12px 14px 9px',
          },
        }}
        value=""
      />
    </div>
  )
}

export default Menu

import { useContext } from 'react'
import Router from 'next/router'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import HistoryIcon from '@mui/icons-material/History'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

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
  const isMobile = useMediaQuery('(max-width:799px)')
  const [{ videos, currentVideoId }, dispatchToAppState] =
    useContext(AppContext)

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const url = e.clipboardData.getData('text/plain')
    const videoId = youTubeGetID(url)
    Router.push(`/?v=${videoId}`)
  }

  const handleHistoryClick = () => {
    dispatchToAppState({ type: actions.SET_OPEN_WATCH_HISTORY, payload: true })
  }

  const { title } = videos.find((video) => video.id === currentVideoId) || {}

  const titleDisplay = title && (
    <Typography
      sx={{
        padding: '10px 12px',
        color: '#333',
      }}
      variant="h6"
    >
      {title}
    </Typography>
  )

  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <IconButton onClick={handleHistoryClick}>
          <HistoryIcon fontSize="large" />
        </IconButton>
        <TextField
          sx={{ minWidth: '224px', padding: '4px' }}
          variant="outlined"
          placeholder="Paste YouTube URL here"
          inputProps={{
            onPaste: handlePaste,
            style: {
              padding: isMobile ? '10px 14px' : '12px 14px 9px',
            },
          }}
          value=""
        />
        {!isMobile && titleDisplay}
      </div>
      {isMobile && titleDisplay}
      <Typography
        sx={{
          padding: '4px 12px',
          color: 'darkslategrey',
        }}
        variant="h5"
      >
        VideoRead - Take good notes from videos
      </Typography>
    </div>
  )
}

export default Menu

import { useContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowDropUpIcon from '@mui/icons-material/ArrowLeft'
import ArrowDropDownIcon from '@mui/icons-material/ArrowRight'
import TextField from '@mui/material/TextField'

import { AppContext, actions } from '../../contexts/appContexts'
import { NoteType } from '../../types'

interface NoteProps {
  note: NoteType
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const [{ player }, dispatchToAppState] = useContext(AppContext)

  const handleTimestampClick = () => {
    dispatchToAppState({ type: actions.SEEK_TO, payload: note.timestamp })
  }

  const handlePreponeClick = () => {
    dispatchToAppState({ type: actions.PREPONE_TIMESTAMP, payload: note.id })
  }

  const handlePostponeClick = () => {
    dispatchToAppState({ type: actions.POSTPONE_TIMESTAMP, payload: note.id })
  }

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToAppState({
      type: actions.UPDATE_NOTE,
      payload: { id: note.id, text: e.target.value } as NoteType,
    })
  }

  const handleTextFieldBlur = () => {
    if (!note.text) {
      dispatchToAppState({ type: actions.DELETE_NOTE, payload: note.id })
    }
  }

  const handleTextFieldFocus = () => {
    if (note.timestamp === undefined && player) {
      dispatchToAppState({
        type: actions.ADD_NOTE,
        payload: { ...note, timestamp: Math.floor(player.getCurrentTime()) },
      })
    }
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton onClick={handleTimestampClick}>
          <Typography fontSize="small">
            {note.timestamp !== undefined
              ? new Date(note.timestamp * 1000).toISOString().substr(12, 7)
              : 'h:mm:ss'}
          </Typography>
        </IconButton>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <IconButton onClick={handlePreponeClick}>
            <ArrowDropUpIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handlePostponeClick}>
            <ArrowDropDownIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <TextField
        placeholder="Note"
        multiline
        minRows={2}
        style={{ width: '100%' }}
        InputProps={{ style: { fontSize: 14 } }}
        value={note.text}
        onChange={handleTextFieldChange}
        onBlur={handleTextFieldBlur}
        onFocus={handleTextFieldFocus}
      />
    </Card>
  )
}

export default Note

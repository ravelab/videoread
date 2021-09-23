import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AppContext } from '../../contexts/appContexts'
import { NoteType } from '../../types'
import Note from '../Note/Note'

interface NoteListProps {
  deviceType: string
}

const NoteList: React.FC<NoteListProps> = ({ deviceType }): JSX.Element => {
  const [{ currentVideoId, notes }] = useContext(AppContext)

  const noteList = [
    ...notes,
    ...(notes.find((note) => !note.text)
      ? []
      : [
          {
            id: uuidv4(),
            text: '',
            timestamp: undefined,
          } as NoteType,
        ]),
  ]

  return (
    <div
      style={{
        width: deviceType === 'mobile' ? '100%' : 380,
        overflowY: 'auto',
        maxHeight: deviceType === 'mobile' ? '20vh' : '100vh',
        padding: 0,
      }}
    >
      {currentVideoId &&
        noteList.map((note) => <Note key={note.id} note={note} />)}
    </div>
  )
}

export default NoteList

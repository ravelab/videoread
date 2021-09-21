import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AppContext } from '../../contexts/appContexts'
import { NoteType } from '../../types'

import Note from '../Note/Note'

const NoteList = (): JSX.Element => {
  const [{ videos }] = useContext(AppContext)

  const notes = [
    ...videos[0].notes,
    ...(videos[0].notes.find((note) => !note.text)
      ? []
      : [
          {
            id: uuidv4(),
            timestamp: null,
            text: '',
          } as NoteType,
        ]),
  ]

  return (
    <div
      style={{
        width: 540,
        overflowY: 'auto',
        maxHeight: '100vh',
      }}
    >
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  )
}

export default NoteList

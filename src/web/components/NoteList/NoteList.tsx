import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AppContext } from '../../contexts/appContexts'
import { NoteType } from '../../types'
import Note from '../Note/Note'

import styles from './NoteList.module.css'

const NoteList = (): JSX.Element => {
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
    <div className={styles.noteListContainer}>
      {currentVideoId &&
        noteList.map((note) => <Note key={note.id} note={note} />)}
    </div>
  )
}

export default NoteList

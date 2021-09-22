import { useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { actions, AppContext } from '../../contexts/appContexts'
import { NoteType } from '../../types'

import Note from '../Note/Note'

const localStorageNotes: NoteType[] = [
  // {
  //   id: 'f289f2a3-0e96-4dc4-93bd-6565899c4900',
  //   text: 'note after 10 seconds',
  //   timestamp: 10,
  // },
  // {
  //   id: 'bf288a6c-fd15-46ea-8681-3d21c7a2555a',
  //   text: 'note after 20 seconds',
  //   timestamp: 20,
  // },
]

interface NoteListProps {
  deviceType: string
}

const NoteList: React.FC<NoteListProps> = ({ deviceType }): JSX.Element => {
  const [{ currentVideoId, notes }, dispatchToAppState] = useContext(AppContext)

  useEffect(() => {
    if (currentVideoId) {
      dispatchToAppState({
        type: actions.SET_NOTES,
        payload: localStorageNotes,
      })
    }
  }, [currentVideoId, dispatchToAppState])

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
      }}
    >
      {currentVideoId &&
        noteList.map((note) => <Note key={note.id} note={note} />)}
    </div>
  )
}

export default NoteList

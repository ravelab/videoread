import React, { useReducer } from 'react'
import { YouTubePlayer } from 'youtube-player/dist/types'

import { AppStateType, NoteType } from '../types'

const initialState: AppStateType = {
  videos: [
    {
      id: 'mYcLuWHzfmE',
      lastWatched: 'date',
      notes: [
        {
          id: 'f289f2a3-0e96-4dc4-93bd-6565899c4900',
          timestamp: 10,
          text: 'note after 10 seconds',
        },
        {
          id: 'bf288a6c-fd15-46ea-8681-3d21c7a2555a',
          timestamp: 20,
          text: 'note after 20 seconds',
        },
      ],
    },
  ],
  player: null,
  seekTo: null,
}

type Action = {
  type: string
  payload?: string | number | NoteType | YouTubePlayer | null
}

const AppContext = React.createContext<[AppStateType, React.Dispatch<Action>]>([
  initialState,
  () => {
    return
  },
])

const actions = {
  DELETE_NOTE: 'DELETE_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  ADD_NOTE: 'ADD_NOTE',
  SEEK_TO: 'SEEK_TO',
  CLEAR_SEEK_TO: 'CLEAR_SEEK_TO',
  PREPONE_TIMESTAMP: 'PREPONE_TIMESTAMP',
  POSTPONE_TIMESTAMP: 'POSTPONE_TIMESTAMP',
  SET_PLAYER: 'SET_PLAYER',
}

const compare = (a: NoteType, b: NoteType) =>
  Number(a.timestamp) - Number(b.timestamp)

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actions.DELETE_NOTE: {
      return {
        ...state,
        videos: [
          {
            ...state.videos[0],
            notes: [
              ...state.videos[0].notes.filter(
                (note) => note.id !== (action.payload as string)
              ),
            ],
          },
        ],
      }
    }

    case actions.UPDATE_NOTE: {
      const { id, text } = action.payload as NoteType
      const notes = state.videos[0].notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            text,
          }
        }
        return note
      })
      return {
        ...state,
        videos: [
          {
            ...state.videos[0],
            notes,
          },
        ],
      }
    }

    case actions.ADD_NOTE: {
      const notes = [
        ...state.videos[0].notes,
        { ...(action.payload as NoteType) },
      ].sort(compare)
      return {
        ...state,
        videos: [
          {
            ...state.videos[0],
            notes,
          },
        ],
      }
    }

    case actions.SEEK_TO: {
      return { ...state, seekTo: action.payload as number }
    }

    case actions.CLEAR_SEEK_TO: {
      return { ...state, seekTo: null }
    }

    case actions.PREPONE_TIMESTAMP:
    case actions.POSTPONE_TIMESTAMP: {
      const offset = action.type === actions.PREPONE_TIMESTAMP ? -1 : 1
      const notes = state.videos[0].notes
        .map((note) => {
          if (note.id === (action.payload as string)) {
            return {
              ...note,
              timestamp:
                note.timestamp !== null && note.timestamp + offset > 0
                  ? note.timestamp + offset
                  : 0,
            }
          }
          return note
        })
        .sort(compare)
      return {
        ...state,
        videos: [
          {
            ...state.videos[0],
            notes,
          },
        ],
      }
    }

    case actions.SET_PLAYER: {
      return { ...state, player: action.payload as YouTubePlayer }
    }

    default: {
      return state
    }
  }
}

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider, actions }

import React, { useReducer } from 'react'
import { YouTubePlayer } from 'youtube-player/dist/types'

import { VideoType, NoteType } from '../types'

interface AppStateType {
  videos: VideoType[]
  notes: NoteType[]
  currentVideoId?: string
  seekTo?: number
  player?: YouTubePlayer
  deviceType?: string
  videosLoaded: boolean
  notesLoaded: boolean
}

const initialState: AppStateType = {
  videos: [],
  notes: [],
  currentVideoId: undefined,
  player: undefined,
  seekTo: undefined,
  deviceType: undefined,
  videosLoaded: false,
  notesLoaded: false,
}

type Action = {
  type: string
  payload?:
    | string
    | number
    | NoteType
    | YouTubePlayer
    | VideoType[]
    | NoteType[]
    | VideoType
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
  PLAY_VIDEO: 'PLAY_VIDEO',
  LOAD_VIDEOS: 'LOAD_VIDEOS',
  UPSERT_VIDEO: 'UPSERT_VIDEO',
  LOAD_NOTES: 'LOAD_NOTES',
  SET_DEVICE_TYPE: 'SET_DEVICE_TYPE',
}

const compareNotes = (a: NoteType, b: NoteType) =>
  Number(a.timestamp) - Number(b.timestamp)

const compareVideos = (a: VideoType, b: VideoType) =>
  b.lastWatched - a.lastWatched

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actions.DELETE_NOTE: {
      return {
        ...state,
        notes: [
          ...state.notes.filter(
            (note) => note.id !== (action.payload as string)
          ),
        ],
      }
    }

    case actions.UPDATE_NOTE: {
      const { id, text } = action.payload as NoteType
      const notes = state.notes.map((note) => {
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
        notes,
      }
    }

    case actions.ADD_NOTE: {
      const notes = [...state.notes, { ...(action.payload as NoteType) }].sort(
        compareNotes
      )
      return {
        ...state,
        notes,
      }
    }

    case actions.PREPONE_TIMESTAMP:
    case actions.POSTPONE_TIMESTAMP: {
      const offset = action.type === actions.PREPONE_TIMESTAMP ? -1 : 1
      const notes = state.notes
        .map((note) => {
          if (note.id === (action.payload as string)) {
            return {
              ...note,
              timestamp:
                note.timestamp !== undefined && note.timestamp + offset > 0
                  ? note.timestamp + offset
                  : 0,
            }
          }
          return note
        })
        .sort(compareNotes)
      return {
        ...state,
        notes,
      }
    }

    case actions.LOAD_NOTES: {
      return {
        ...state,
        notes: action.payload as NoteType[],
        notesLoaded: true,
      }
    }

    case actions.SEEK_TO: {
      return { ...state, seekTo: action.payload as number }
    }

    case actions.CLEAR_SEEK_TO: {
      return { ...state, seekTo: undefined }
    }

    case actions.SET_PLAYER: {
      return { ...state, player: action.payload as YouTubePlayer }
    }

    case actions.PLAY_VIDEO: {
      return {
        ...state,
        currentVideoId: action.payload as string,
        notesLoaded: false,
      }
    }

    case actions.LOAD_VIDEOS: {
      return {
        ...state,
        videos: action.payload as VideoType[],
        videosLoaded: true,
      }
    }

    case actions.UPSERT_VIDEO: {
      const videos = [
        ...state.videos.filter(
          (video) => video.id !== (action.payload as VideoType).id
        ),
        { ...(action.payload as VideoType) },
      ].sort(compareVideos)
      return { ...state, videos }
    }

    case actions.SET_DEVICE_TYPE: {
      return { ...state, deviceType: action.payload as string }
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

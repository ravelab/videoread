import { YouTubePlayer } from 'youtube-player/dist/types'

export interface NoteType {
  id: string
  timestamp: number | null
  text: string
}

export interface VideoType {
  id: string
  lastWatched: string
  notes: NoteType[]
}

export interface AppStateType {
  videos: VideoType[]
  seekTo: number | null
  player: YouTubePlayer | null
}

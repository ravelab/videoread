export interface NoteType {
  id: string
  text: string
  timestamp?: number
}

export interface VideoType {
  id: string
  title: string
  lastWatched: number
}

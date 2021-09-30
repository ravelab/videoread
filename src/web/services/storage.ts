import throttle from 'lodash/throttle'
import { NoteType, VideoType } from '../../web/types'

export const saveVideosIfNeeded = throttle((videos: VideoType[]) => {
  const videosJson = JSON.stringify(videos)
  const storageVideosJson = localStorage.getItem('videos')
  if (videosJson !== storageVideosJson) {
    //console.log("setItem('videos': ", videosJson)
    localStorage.setItem('videos', videosJson)
  }
}, 5000)

export const saveNotesIfNeeded = throttle(
  (notes: NoteType[], currentVideoId: string) => {
    const key = `notes-${currentVideoId}`
    const notesJson = JSON.stringify(notes)
    const storageNotesJson = localStorage.getItem(key)
    if (notesJson !== storageNotesJson) {
      //console.log('setItem(', key, notesJson)
      localStorage.setItem(key, notesJson)
    }
  },
  5000
)

export const loadVideos = (): VideoType[] => {
  const storageVideosJson = localStorage.getItem('videos') || '[]'
  let videos: VideoType[] = []
  try {
    videos = JSON.parse(storageVideosJson)
  } catch (e) {
    console.error(e)
  }
  return videos
}

export const loadNotes = (currentVideoId: string): NoteType[] => {
  const storageNotesJson =
    localStorage.getItem(`notes-${currentVideoId}`) || '[]'
  let notes: NoteType[] = []
  try {
    notes = JSON.parse(storageNotesJson)
  } catch (e) {
    console.error(e)
  }
  return notes
}

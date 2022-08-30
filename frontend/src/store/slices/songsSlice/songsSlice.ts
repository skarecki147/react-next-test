import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SongsApi } from '../../../services/api/songs.api'
import { RootState } from '../../rootReducer'
import { ISong, LoadingStatus } from '../../types'

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (query: number) => await SongsApi.fetchSongs(String(query)),
)
type SliceState = {
  songs: ISong[] | undefined
  status: LoadingStatus
}
const initialState: SliceState = {
  songs: undefined,
  status: LoadingStatus.NEVER,
}
export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSongs.pending.type]: (state, action) => {
      state.status = LoadingStatus.LOADING
    },
    [fetchSongs.fulfilled.type]: (state, action) => {
      console.log('songs from slice', action.payload.results)

      const songs = action.payload.results
      // checking if collection includes the correct data
      const songWrapperType = 'track'
      const filteredSongs = songs.filter((song: any) => song.wrapperType === songWrapperType)
      state.songs = filteredSongs
      state.status = LoadingStatus.SUCCESS
      console.log('filteredSongs from slice', filteredSongs)
    },
    [fetchSongs.rejected.type]: (state, action) => {
      state.status = LoadingStatus.ERROR
    },
  },
})
export const songsSelector = (state: RootState) => state.SongsSlice.songs
export const loadingSongsStatusSelector = (state: RootState) => state.SongsSlice.status
export default songsSlice.reducer

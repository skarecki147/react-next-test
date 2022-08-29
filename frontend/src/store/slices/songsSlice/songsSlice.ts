import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SongsApi } from '../../../services/api/songs.api'
import { RootState } from '../../rootReducer'
import { ISong, LoadingStatus } from '../../types'

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (query: string) => await SongsApi.fetchSongs(query),
)
type SliceState = { songs: ISong[] | undefined; status: LoadingStatus }

const initialState: SliceState = { songs: undefined, status: LoadingStatus.NEVER }

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSongs.pending.type]: (state, action) => {
      state.status = LoadingStatus.LOADING
    },
    [fetchSongs.fulfilled.type]: (state, action) => {
      state.status = LoadingStatus.SUCCESS
      state.songs = action.payload.results
    },
    [fetchSongs.rejected.type]: (state, action) => {
      state.status = LoadingStatus.ERROR
    },
  },
})

export const songSelector = (state: RootState) => state.songsSlice.songs
export const loadingStatusSelector = (state: RootState) => state.songsSlice.status

export default songsSlice.reducer

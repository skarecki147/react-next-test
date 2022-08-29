import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AlbumsApi } from '../../../services/api/albums.api'

import { RootState } from '../../rootReducer'
import { IAlbum, LoadingStatus } from '../../types'

export const fetchAlbums = createAsyncThunk(
  'Albums/fetchAlbums',
  async (query: number) => await AlbumsApi.fetchAlbums(String(query)),
)
type SliceState = {
  albums: IAlbum | undefined
  status: LoadingStatus
}

const initialState: SliceState = {
  albums: undefined,
  status: LoadingStatus.NEVER,
}

export const AlbumsSlice = createSlice({
  name: 'Albums',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAlbums.pending.type]: (state, action) => {
      state.status = LoadingStatus.LOADING
    },
    [fetchAlbums.fulfilled.type]: (state, action) => {
      state.albums = action.payload.results
      state.status = LoadingStatus.SUCCESS
    },
    [fetchAlbums.rejected.type]: (state, action) => {
      state.status = LoadingStatus.ERROR
    },
  },
})

export const albumsSelector = (state: RootState) => state.albumsSlice.albums
export const loadingStatusSelector = (state: RootState) => state.songsSlice.status

export default AlbumsSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AlbumsApi } from '../../../services/api/albums.api'
import { RootState } from '../../rootReducer'
import { IAlbum, LoadingStatus } from '../../types'

export const fetchAlbums = createAsyncThunk(
  'Albums/fetchAlbums',
  async (query: number) => await AlbumsApi.fetchAlbums(String(query)),
)
type SliceState = {
  albums: IAlbum[] | undefined
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
      const albums = action.payload.results
      // checking if collection includes the correct data
      const albumWrapperType = 'collection'
      const filteredAlbums = albums.filter((album: any) => album.wrapperType === albumWrapperType)
      state.albums = filteredAlbums
      state.status = LoadingStatus.SUCCESS
      console.log('albums from slice', filteredAlbums)
    },
    [fetchAlbums.rejected.type]: (state, action) => {
      state.status = LoadingStatus.ERROR
    },
  },
})
export const albumsSelector = (state: RootState) => state.AlbumsSlice.albums
export const loadingAlbumsStatusSelector = (state: RootState) => state.AlbumsSlice.status
export default AlbumsSlice.reducer

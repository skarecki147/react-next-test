import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ArtistsApi } from '../../../services/api/artists.api'
import { RootState } from '../../rootReducer'
import { IArtists, LoadingStatus } from '../../types'

export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async (query: string) => await ArtistsApi.fetchArtists(query),
)
type SliceState = {
  artists: IArtists[] | undefined
  artistsId: number[] | undefined
  status: LoadingStatus
}
const initialState: SliceState = {
  artists: undefined,
  artistsId: undefined,
  status: LoadingStatus.NEVER,
}
export const ArtistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArtists.pending.type]: (state, action) => {
      state.status = LoadingStatus.LOADING
    },
    [fetchArtists.fulfilled.type]: (state, action) => {
      const artists = action.payload.results
      state.status = LoadingStatus.SUCCESS
      const artistsId = artists
        .map((artist: IArtists) => artist.amgArtistId)
        .filter((artistId: number) => artistId)
      state.artists = artists
      state.artistsId = artistsId
    },
    [fetchArtists.rejected.type]: (state, action) => {
      state.status = LoadingStatus.ERROR
    },
  },
})
export const artistsSelector = (state: RootState) => state.ArtistsSlice.artists
export const artistsIdSelector = (state: RootState) => state.ArtistsSlice.artistsId
export const loadingArtistsStatusSelector = (state: RootState) => state.ArtistsSlice.status
export default ArtistsSlice.reducer

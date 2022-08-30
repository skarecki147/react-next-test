import { combineReducers } from '@reduxjs/toolkit'
import AlbumsSlice from './slices/albumsSlice/albumsSlice'
import ArtistsSlice from './slices/artistsSlice/artistsSlice'
import SongsSlice from './slices/songsSlice/songsSlice'

const rootReducer = combineReducers({
  AlbumsSlice,
  SongsSlice,
  ArtistsSlice,
})

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>

export default rootReducer

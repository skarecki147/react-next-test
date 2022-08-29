import { combineReducers } from '@reduxjs/toolkit'
import albumsSlice from './slices/albumsSlice/albumsSlice'
import artistsSlice from './slices/artistsSlice/artistsSlice'
import songsSlice from './slices/songsSlice/songsSlice'

const rootReducer = combineReducers({
  artistsSlice,
  songsSlice,
  albumsSlice,
})

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>

export default rootReducer

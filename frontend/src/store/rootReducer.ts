import { combineReducers } from '@reduxjs/toolkit'
import songsSlice from './slices/songsSlice/songsSlice'

const rootReducer = combineReducers({
  songsSlice,
})

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>

export default rootReducer

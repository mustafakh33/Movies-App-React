import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../reducer/moviesReducer'

// 1- create store
export const store = configureStore({
  reducer: {
    movies : moviesReducer,
  },
})
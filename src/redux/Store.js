import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice
  },
})
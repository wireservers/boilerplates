
import { configureStore } from '@reduxjs/toolkit'
import controls from './controlsSlice'
export const store = configureStore({ reducer: { controls } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type Controls = { paused: boolean; windowSec: number }
const initial: Controls = { paused: false, windowSec: 60 }
const slice = createSlice({
  name: 'controls', initialState: initial,
  reducers: {
    togglePaused(s){ s.paused = !s.paused },
    setWindow(s, a: PayloadAction<number>){ s.windowSec = a.payload }
  }
})
export const { togglePaused, setWindow } = slice.actions
export default slice.reducer

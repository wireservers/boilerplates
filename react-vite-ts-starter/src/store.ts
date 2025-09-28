
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

type UiState = { theme: 'light' | 'dark' }
const initialState: UiState = { theme: 'light' }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<UiState['theme']>) {
      state.theme = action.payload
    }
  }
})

export const { setTheme } = uiSlice.actions

export const store = configureStore({
  reducer: { ui: uiSlice.reducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

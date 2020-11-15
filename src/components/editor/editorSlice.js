import { createSlice } from '@reduxjs/toolkit'

const namespace = 'editor'

const editorSlice = createSlice({
  name: namespace,
  initialState: {},
  reducers: {
    setText: (state, action) => void(state.text = action.payload),
    setCurrentWord: (state, action) => void(state.currentWord = action.payload),
  },
})

export default editorSlice.reducer
export const { setText, setCurrentWord } = editorSlice.actions

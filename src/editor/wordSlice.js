import { createSlice } from '@reduxjs/toolkit'

const namespace = 'word'

const wordSlice = createSlice({
  name: namespace,
  initialState: {},
  reducers: {
    setWord: (state, action) => void(state.word = action.payload),
  },
})

export default wordSlice.reducer
export const { setWord } = wordSlice.actions

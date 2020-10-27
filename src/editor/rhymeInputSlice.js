import { createSlice } from '@reduxjs/toolkit'

const namespace = 'rhymeInput'

const rhymeInputSlice = createSlice({
  name: namespace,
  initialState: "",
  reducers: {
    setText: (state, action) => void(state.text = action.payload),
  },
})

export default rhymeInputSlice.reducer
export const { setText } = rhymeInputSlice.actions

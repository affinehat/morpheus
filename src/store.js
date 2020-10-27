import { configureStore } from '@reduxjs/toolkit'
import { from } from 'rxjs'

import editorReducer from 'editor/editorSlice'
import rhymeInputReducer from 'editor/rhymeInputSlice'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux-state')
    if (serializedState == null) { return undefined }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('redux-state', serializedState)
  } catch (err) {
    console.err(err)
  }
}

const preloadedState = loadState()
const store = configureStore({
  reducer: {
    editor: editorReducer,
    userInput: rhymeInputReducer,
  },
  preloadedState
})

const store$ = from(store)
store$.subscribe(next => {
  saveState(store.getState())
})

export default store

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { from } from 'rxjs'

import editorReducer from 'editor/editorSlice'
import { apiCallReducer } from 'api/api'
import { datamuseEpic } from 'api/datamuse'
import { rhymebrainEpic } from 'api/rhymebrain'
import { urbandictionaryEpic } from 'api/urbandictionary'

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

const epicMiddleware = createEpicMiddleware()
const rootEpic = combineEpics(
  datamuseEpic,
  rhymebrainEpic,
  urbandictionaryEpic
)

const store = configureStore({
  reducer: {
    editor: editorReducer,
    api: apiCallReducer,
  },
  middleware: [epicMiddleware, ...getDefaultMiddleware()],
  preloadedState
})

epicMiddleware.run(rootEpic)

const store$ = from(store)
store$.subscribe(next => {
  saveState(store.getState())
})

export default store

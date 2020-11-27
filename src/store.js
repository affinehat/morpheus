import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { from } from 'rxjs'

import editorReducer from 'editor/editorSlice'
import { apiStatusReducer, initializeAPICallEpic } from 'api/apiStatus'
import { rhymebrainReducer, rhymebrainEpic } from 'api/APIs/rhymebrain'
import { datamuseReducer, datamuseEpic } from 'api/APIs/datamuse'

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
  rhymebrainEpic,
  datamuseEpic,
)

const store = configureStore({
  reducer: {
    editor: editorReducer,
    apiStatus: apiStatusReducer,
    rhymebrain: rhymebrainReducer,
    datamuse: datamuseReducer,
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

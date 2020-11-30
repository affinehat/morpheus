import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { from } from 'rxjs'

import editorReducer from 'editor/editorSlice'
import { apiStatusReducer } from 'api/apiStatus'
import { datamuseReducer, datamuseRhymesEpic, datamuseSynonymsEpic } from 'api/Reducers&Epics/datamuse'

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
  datamuseRhymesEpic,
  datamuseSynonymsEpic,
)

const store = configureStore({
  reducer: {
    editor: editorReducer,
    apiStatus: apiStatusReducer,
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

import { map, switchMap } from 'rxjs/operators'
import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'

import callAPI from 'api/apiRequestWrapper'

const datamuseSlice = createSlice({
  name: 'datamuse',
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
    decoupled: (state, action) => null,
  },
})

const datamuseReducer = datamuseSlice.reducer
const selectSynonyms = state => state.datamuse
const datamuseLoaded = datamuseSlice.actions.loaded
const datamuseDecoupled = datamuseSlice.actions.decoupled

const datamuseEpic = (action$, state$) => action$.pipe(
  ofType(datamuseDecoupled.type),
  switchMap(action =>
    callAPI({
      protocol: 'https',
      host: 'api.datamuse.com',
      path: 'words?rel_syn=' + state$.value.editor.currentWord,
    }).pipe(
      map(ajax => datamuseLoaded(ajax.response.length?ajax.response.slice(0, 20):[{"word": "No matches found"}])),
    )
  ),
)

export { datamuseReducer, selectSynonyms, datamuseLoaded, datamuseDecoupled, datamuseEpic }

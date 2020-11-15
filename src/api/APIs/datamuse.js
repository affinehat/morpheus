import { of } from 'rxjs'
import { map, switchMap, mergeMap } from 'rxjs/operators'
import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'

import callAPI from 'api/apiRequestWrapper'
import { requestWord, responseRecieved } from "api/apiStatus"

const datamuseSlice = createSlice({
  name: 'datamuse',
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
  },
})

const datamuseLoaded = datamuseSlice.actions.loaded

const datamuseEpic = (action$, state$) => action$.pipe(
  ofType(requestWord.type),
  map(x => x = {payload: x.payload.requestPayload}),
  switchMap(action =>
    callAPI({
      protocol: 'https',
      host: 'api.datamuse.com',
      path: 'words?rel_syn=' + action.payload,
    }).pipe(
      map(ajax => datamuseLoaded(ajax.response.length?ajax.response.slice(0, 20):[{"word": "No matches found"}])),
      mergeMap(action => {
         return of(action, responseRecieved({...state$.value.apiStatus, synonymLoaded: true}))
      }),
    )
  ),
)

const selectSynonyms = state => state.datamuse

export { datamuseEpic, selectSynonyms, datamuseLoaded }
export const datamuseReducer = datamuseSlice.reducer

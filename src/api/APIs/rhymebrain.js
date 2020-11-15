import { of } from 'rxjs'
import { map, switchMap, mergeMap } from 'rxjs/operators'
import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'

import callAPI from 'api/apiRequestWrapper'
import { requestWord, responseRecieved } from "api/apiStatus"

const rhymebrainSlice = createSlice({
  name: 'rhymebrain',
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
  },
})

const rhymebrainLoaded = rhymebrainSlice.actions.loaded

const rhymebrainEpic = (action$, state$) => action$.pipe(
  ofType(requestWord.type),
  map(x => x = {payload: x.payload.requestPayload}),
  switchMap(action =>
    callAPI({
      protocol: 'https',
      host: 'rhymebrain.com',
      path: 'talk?function=getRhymes&word=' + action.payload,
    }).pipe(
      map(ajax => rhymebrainLoaded(ajax.response.length?ajax.response.slice(0, 20):[{"word": "No matches found"}])),
      mergeMap(action => {
         return of(action, responseRecieved({...state$.value.apiStatus, rhymeLoaded: true}))
      }),
    )
  ),
)

const selectRhymes = state => state.rhymebrain

export { rhymebrainEpic, selectRhymes, rhymebrainLoaded }
export const rhymebrainReducer = rhymebrainSlice.reducer

import { map, switchMap } from 'rxjs/operators'
import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'

import callAPI from 'api/apiRequestWrapper'

const rhymebrainSlice = createSlice({
  name: 'rhymebrain',
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
    decoupled: (state, action) => null,
  },
})

const rhymebrainReducer = rhymebrainSlice.reducer
const selectRhymes = state => state.rhymebrain
const rhymebrainLoaded = rhymebrainSlice.actions.loaded
const rhymebrainDecoupled = rhymebrainSlice.actions.decoupled

const rhymebrainEpic = (action$, state$) => action$.pipe(
  ofType(rhymebrainDecoupled.type),
  switchMap(action =>
    callAPI({
      protocol: 'https',
      host: 'rhymebrain.com',
      path: 'talk?function=getRhymes&word=' + state$.value.editor.currentWord,
    }).pipe(
      map(ajax => rhymebrainLoaded(ajax.response.length?ajax.response.slice(0, 20):[{"word": "No matches found"}])),
    )
  ),
)

export { rhymebrainReducer, selectRhymes, rhymebrainLoaded, rhymebrainDecoupled, rhymebrainEpic }

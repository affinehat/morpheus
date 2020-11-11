import { tap, map, switchMap, distinctUntilKeyChanged, filter } from 'rxjs/operators'
import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'

import callAPI from 'api/api'
import { setCurrentWord } from 'editor/editorSlice'


const rhymebrainSlice = createSlice({
  name: 'rhymebrain',
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
  },
})

const rhymebrainLoaded = rhymebrainSlice.actions.loaded

const rhymebrainEpic = action$ => action$.pipe(
  ofType(setCurrentWord.type),
  distinctUntilKeyChanged('payload'),
  filter(action => action.payload.trim() !== ''),
  //tap(x => console.log(x)),
  switchMap(action =>
    callAPI({
      protocol: 'https',
      host: 'rhymebrain.com',
      path: 'talk?function=getRhymes&word=' + action.payload,
    }).pipe(
      map(ajax => rhymebrainLoaded(ajax.response.slice(0, 20)))
    )
  )
)

const selectRhymes = state => state.rhymebrain

export { rhymebrainEpic, selectRhymes }
export const rhymebrainReducer = rhymebrainSlice.reducer

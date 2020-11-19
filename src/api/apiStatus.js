import { of } from "rxjs"
import { createSlice } from '@reduxjs/toolkit'
import { switchMap, distinctUntilKeyChanged, filter } from "rxjs/operators"
import { ofType } from "redux-observable"

import { setCurrentWord } from "editor/editorSlice"
import { rhymebrainDecoupled } from "api/APIs/rhymebrain"
import { datamuseDecoupled } from "api/APIs/datamuse"

const apiStatusSlice = createSlice({
  name: 'apiStatus',
  initialState: null,
  reducers: {
    update: (state, action) => action.payload,
  },
})

const apiStatusReducer = apiStatusSlice.reducer
const selectAPIStatus = state => state.apiStatus
const updateAPIStatus = apiStatusSlice.actions.update

const initializeAPICallEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    distinctUntilKeyChanged("payload"),
    filter(action => action.payload.trim() !== ""),
    switchMap(action => {
      return of(
        updateAPIStatus({
          rhymebrainLoaded: false,
          datamuseLoaded: false,
        }),
        rhymebrainDecoupled(),
        datamuseDecoupled(),
      );
    }),
  );

export {apiStatusReducer, selectAPIStatus, updateAPIStatus, initializeAPICallEpic};

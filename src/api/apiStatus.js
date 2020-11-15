import { of } from "rxjs"
import { switchMap, distinctUntilKeyChanged, filter } from "rxjs/operators"
import { createSlice } from "@reduxjs/toolkit"
import { ofType } from "redux-observable"

import { setCurrentWord } from "editor/editorSlice"
import { rhymebrainLoaded } from "api/APIs/rhymebrain"
import { datamuseLoaded } from "api/APIs/datamuse"

const apiStatusSlice = createSlice({
  name: "apiStatus",
  initialState: null,
  reducers: {
    requestWord: (state, action) => action.payload,
    responseRecieved: (state, action) => action.payload
  }
});

const apiStatusReducer = apiStatusSlice.reducer;
const requestWord = apiStatusSlice.actions.requestWord;
const responseRecieved = apiStatusSlice.actions.responseRecieved;

const apiCallInitEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    distinctUntilKeyChanged("payload"),
    filter(action => action.payload.trim() !== ""),
    switchMap(prevAction => {
      return of(
        requestWord({
          synonymLoaded: false,
          rhymeLoaded: false,
          requestPayload: prevAction.payload
        }),
        rhymebrainLoaded([{"word": "Loading..."}]),
        datamuseLoaded([{"word": "Loading..."}])
      );
    })
  );

export {apiStatusReducer, requestWord, responseRecieved, apiCallInitEpic};

import {of, from, concat} from "rxjs";
import {map, switchMap, mergeMap} from "rxjs/operators";
import {createSlice} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";

import callAPI from "api/apiRequestWrapper";
import {apiStarted, apiLoaded, apiErrored} from "api/apiStatus";
import {setCurrentWord} from "editor/editorSlice";

const datamuseSlice = createSlice({
  name: "datamuse",
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
    decoupled: (state, action) => null
  }
});

const datamuseReducer = datamuseSlice.reducer;
const selectSynonyms = state => state.datamuse;
const datamuseLoaded = datamuseSlice.actions.loaded;
const datamuseDecoupled = datamuseSlice.actions.decoupled;

const datamuseEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    switchMap(action =>
      concat(
        of(apiStarted("datamuseLoaded")),
        from(
          callAPI({
            protocol: "https",
            host: "api.datamuse.com",
            path: "words?rel_syn=" + action.payload
          })
        ).pipe(
          map(ajax =>
            datamuseLoaded(
              ajax.response.length
                ? ajax.response.slice(0, 20)
                : [{word: "No matches found"}]
            )
          ),
          mergeMap(ajax => of(ajax, apiLoaded("datamuseLoaded")))
        )
      )
    )
  );

export {
  datamuseReducer,
  selectSynonyms,
  datamuseLoaded,
  datamuseDecoupled,
  datamuseEpic
};

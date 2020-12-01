import {of, from, concat} from "rxjs";
import {switchMap, mergeMap} from "rxjs/operators";
import {createSlice} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";

import {callAPI, topResults, filterUnchangedOrEmpty} from "api/api";
import {apiStarted, apiLoaded, apiErrored} from "api/apiStatus";
import {setCurrentWord} from "editor/editorSlice";

const datamuseSlice = createSlice({
  name: "datamuse",
  initialState: {},
  reducers: {
    rhymesLoaded: (state, action) => void (state.rhymes = action.payload),
    rhymesDeleted: (state, action) => void (state.rhymes = null),
    synonymsLoaded: (state, action) => void (state.synonyms = action.payload),
    synonymsDeleted: (state, action) => void (state.synonyms = null)
  }
});

const datamuseReducer = datamuseSlice.reducer;

const selectRhymes = state => state.datamuse.rhymes;
const datamuseRhymesLoaded = datamuseSlice.actions.rhymesLoaded;
const datamuseRhymesDeleted = datamuseSlice.actions.rhymesDeleted;

const selectSynonyms = state => state.datamuse.synonyms;
const datamuseSynonymsLoaded = datamuseSlice.actions.synonymsLoaded;
const datamuseSynonymsDeleted = datamuseSlice.actions.synonymsDeleted;

const numResults = 20;

const datamuseEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    filterUnchangedOrEmpty(),
    switchMap(action =>
      concat(
        of(apiStarted("datamuseRhymesLoaded"), apiStarted("datamuseSynonymsLoaded")),
        from(
          callAPI({
            protocol: "https",
            host: "api.datamuse.com",
            path: "words?rel_rhy=" + action.payload
          })
        ).pipe(
          mergeMap(ajax => {
            return of(
              datamuseRhymesLoaded(topResults(ajax, numResults)),
              apiLoaded("datamuseRhymesLoaded")
            );
          })
        ),
        from(
          callAPI({
            protocol: "https",
            host: "api.datamuse.com",
            path: "words?rel_syn=" + action.payload
          })
        ).pipe(
          mergeMap(ajax => {
            return of(
              datamuseSynonymsLoaded(topResults(ajax, numResults)),
              apiLoaded("datamuseSynonymsLoaded")
            );
          })
        )
      )
    )
  );

export {
  datamuseReducer,
  selectRhymes,
  datamuseRhymesLoaded,
  datamuseRhymesDeleted,
  selectSynonyms,
  datamuseSynonymsLoaded,
  datamuseSynonymsDeleted,
  datamuseEpic
};

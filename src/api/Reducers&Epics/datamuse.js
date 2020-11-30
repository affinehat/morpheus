import {of, from, concat} from "rxjs";
import {switchMap, mergeMap} from "rxjs/operators";
import {createSlice} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";

import callAPI from "api/apiRequestWrapper";
import {apiStarted, apiLoaded, apiErrored} from "api/apiStatus";
import {setCurrentWord} from "editor/editorSlice";
import {
  filterUnchangedOrEmptyAPICalls,
  first20ResultsOrNoMatches
} from "api/customFunctionsAndOperators";

const datamuseSlice = createSlice({
  name: "datamuse",
  initialState: {},
  reducers: {
    rhymesLoaded: (state, action) => void (state.rhymes = action.payload),
    rhymesDecoupled: (state, action) => void (state.rhymes = null),
    synonymsLoaded: (state, action) => void (state.synonyms = action.payload),
    synonymsDecoupled: (state, action) => void (state.synonyms = null)
  }
});

const datamuseReducer = datamuseSlice.reducer;

const selectRhymes = state => state.datamuse.rhymes;
const datamuseRhymesLoaded = datamuseSlice.actions.rhymesLoaded;
const datamuseRhymesDecoupled = datamuseSlice.actions.rhymesDecoupled;

const selectSynonyms = state => state.datamuse.synonyms;
const datamuseSynonymsLoaded = datamuseSlice.actions.synonymsLoaded;
const datamuseSynonymsDecoupled = datamuseSlice.actions.synonymsDecoupled;

const datamuseRhymesEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    filterUnchangedOrEmptyAPICalls(),
    switchMap(action =>
      concat(
        of(apiStarted("datamuseRhymesLoaded")),
        from(
          callAPI({
            protocol: "https",
            host: "api.datamuse.com",
            path: "words?rel_rhy=" + action.payload
          })
        ).pipe(
          mergeMap(ajax => {
            return of(
              datamuseRhymesLoaded(first20ResultsOrNoMatches(ajax)),
              apiLoaded("datamuseRhymesLoaded")
            );
          })
        )
      )
    )
  );

const datamuseSynonymsEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    filterUnchangedOrEmptyAPICalls(),
    switchMap(action =>
      concat(
        of(apiStarted("datamuseSynonymsLoaded")),
        from(
          callAPI({
            protocol: "https",
            host: "api.datamuse.com",
            path: "words?rel_syn=" + action.payload
          })
        ).pipe(
          mergeMap(ajax => {
            return of(
              datamuseSynonymsLoaded(first20ResultsOrNoMatches(ajax)),
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
  datamuseRhymesDecoupled,
  datamuseRhymesEpic,
  selectSynonyms,
  datamuseSynonymsLoaded,
  datamuseSynonymsDecoupled,
  datamuseSynonymsEpic
};

import {of, from, concat} from "rxjs";
import {map, switchMap, mergeMap} from "rxjs/operators";
import {createSlice} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";

import callAPI from "api/apiRequestWrapper";
import {apiStarted, apiLoaded, apiErrored} from "api/apiStatus";
import {setCurrentWord} from "editor/editorSlice";

const rhymebrainSlice = createSlice({
  name: "rhymebrain",
  initialState: null,
  reducers: {
    loaded: (state, action) => action.payload,
    decoupled: (state, action) => null
  }
});

const rhymebrainReducer = rhymebrainSlice.reducer;
const selectRhymes = state => state.rhymebrain;
const rhymebrainLoaded = rhymebrainSlice.actions.loaded;
const rhymebrainDecoupled = rhymebrainSlice.actions.decoupled;

const rhymebrainEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    switchMap(action =>
      concat(
        of(apiStarted("rhymebrainLoaded")),
        from(
          callAPI({
            protocol: "https",
            host: "rhymebrain.com",
            path: "talk?function=getRhymes&word=" + action.payload
          })
        ).pipe(
          map(ajax =>
            rhymebrainLoaded(
              ajax.response.length
                ? ajax.response.slice(0, 20)
                : [{word: "No matches found"}]
            )
          ),
          mergeMap(ajax => of(ajax, apiLoaded("rhymebrainLoaded")))
        )
      )
    )
  );

export {
  rhymebrainReducer,
  selectRhymes,
  rhymebrainLoaded,
  rhymebrainDecoupled,
  rhymebrainEpic
};

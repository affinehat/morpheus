import {of} from "rxjs";
import {createSlice} from "@reduxjs/toolkit";
import {switchMap, distinctUntilKeyChanged, filter} from "rxjs/operators";
import {ofType} from "redux-observable";

const apiStatusSlice = createSlice({
  name: "apiStatus",
  initialState: {},
  reducers: {
    started: (state, action) => void (state[action.payload] = false),
    loaded: (state, action) => void (state[action.payload] = true),
    errored: (state, action) =>
      void (state[action.payload].error = action.payload.error)
  }
});

const apiStatusReducer = apiStatusSlice.reducer;
const selectAPIStatus = state => state.apiStatus;
const apiStarted = apiStatusSlice.actions.started;
const apiLoaded = apiStatusSlice.actions.loaded;
const apiErrored = apiStatusSlice.actions.errored;

export {apiStatusReducer, selectAPIStatus, apiStarted, apiLoaded, apiErrored};

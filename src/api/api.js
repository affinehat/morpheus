import { createSlice } from '@reduxjs/toolkit'

import { of, concat, pipe } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { distinctUntilChanged, filter, map, catchError } from 'rxjs/operators'

import { set } from 'lodash'

// api call lifecycle
// --------------------------------
const apiSlice = createSlice({
  name: 'apis',
  initialState: {
    datamuseRhyme: { status: 'not started' },
    datamuseSynonym: { status: 'not started' },
    rhymebrainRhyme: { status: 'not started' },
    rhymebrainWordInfo: { status: 'not started' },
    rhymebrainPortmanteau: { status: 'not started' },
  },
  reducers: {
    started: (state, action) => void (state[action.payload.type].status = 'started'),
    success: (state, action) => {
      state[action.payload.type].status = 'success'
      state[action.payload.type].result = action.payload.result
    },
    failure: (state, action) => {
      state[action.payload.type].status = 'failure'
      state[action.payload.type].error = action.payload.error
    },
  }
})

const apiCallReducer = apiSlice.reducer
const apiCallStarted = apiSlice.actions.started
const apiCallSuccess = apiSlice.actions.success
const apiCallFailure = apiSlice.actions.failure

// api calls go through three stages
// 1. dispatch call started action, [status = started]
// 2. make ajax request
// 3a. if ajax succeeded, dispatch call success action [status = success, store result]
// 3b. if ajax failed, dispatch call failure action [status = failure, store error]
//
// note: this function does not dispatch it only returns the stream of actions$
const callApi = options => {
  let type = options.type
  let url = `${options.protocol}://${options.host}/${options.path}`
  let method = options.method || 'GET'
  let headers = options.headers

  return concat(
    of(apiCallStarted({type})),
    ajax({url, method, headers}).pipe(
      map(result => result.response),
      map(result => apiCallSuccess({type, result})),
      catchError(error => {
        console.error('ajax request error: ', options, error)
        return of(apiCallFailure({type, error: error.toString()}))
      })
    )
  )
}

const hasApiResult = (action) => action.type === apiCallSuccess.type

// take a transform fn and only apply it to "successful api call" type actions
// the api call results will be transformed and overwritten
// other types of actions are returned unchanged
// transform fn takes two params: (api response, action payload)
const apiResultTransformer =
  transformFn =>
    action =>
      hasApiResult(action)
        ? set(action, 'payload.result', transformFn(action.payload.result, action.payload))
        : action

// utility functions
// --------------------------------
// get the current word from a word change action
const extractCurrentWord = action => action.payload

const topResults = (results, maxResults) => {
  // input must be an array
  if (!Array.isArray(results)) {
    console.error('topResults: expected results to be array but received', results)
    results = []
  }

  // get first N results
  return results.slice(0, maxResults)
}

const filterUnchangedOrEmpty = () =>
  pipe(
    distinctUntilChanged(),
    filter(value => value && value.trim() !== '')
  )

// exports
// --------------------------------
export {
  apiCallReducer, apiCallStarted, apiCallSuccess, apiCallFailure,
  callApi, hasApiResult, apiResultTransformer,
  extractCurrentWord, topResults, filterUnchangedOrEmpty,
}

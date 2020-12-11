import { merge } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import {
  callApi, extractCurrentWord, topResults,
  filterUnchangedOrEmpty, apiResultTransformer,
} from 'api/api'

import { setCurrentWord } from 'editor/editorSlice'

// api calls
// --------------------------------

// datamuse api calls returns 100 results, we only store a subset of them
const maxResults = 20
const processDatamuseResult = apiResultTransformer((results) => topResults(results, maxResults))

const callDatamuseApi = (options) => {
  const baseOptions = {
    protocol: 'https',
    host: 'api.datamuse.com',
  }
  const combinedOptions = { ...baseOptions, ...options }

  return callApi(combinedOptions).pipe(map(processDatamuseResult))
}

const callRhymeApi = (word) => {
  const rhymeApiOptions = {
    type: 'datamuseRhyme',
    path: 'words?rel_rhy=' + word,
  }

  return callDatamuseApi(rhymeApiOptions)
}

const callSynonymApi = (word) => {
  const synonymApiOptions = {
    type: 'datamuseSynonym',
    path: 'words?rel_syn=' + word,
  }

  return callDatamuseApi(synonymApiOptions)
}

// datamuse epic
// --------------------------------
const datamuseEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    map(extractCurrentWord),
    filterUnchangedOrEmpty(),
    switchMap(currentWord =>
      merge(
        callRhymeApi(currentWord),
        callSynonymApi(currentWord)
      )
    )
  )

// selectors
// --------------------------------
const selectRhymes = state => state.api.datamuseRhyme.result
const selectSynonyms = state => state.api.datamuseSynonym.result

// exports
// --------------------------------
export {
  datamuseEpic,
  selectRhymes,
  selectSynonyms,
}

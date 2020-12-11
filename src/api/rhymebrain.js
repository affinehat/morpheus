import { merge } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import {
  callApi, extractCurrentWord, topResults,
  filterUnchangedOrEmpty, apiResultTransformer
} from 'api/api'

import { setCurrentWord } from 'editor/editorSlice'

// api calls
// --------------------------------

// for rhyme/portmanteau api calls, we only want a subset of results
const maxRhymes = 20
const maxPortmanteaus = 10
const processRhymebrainResult = apiResultTransformer((results, api) => {
  if (api.type === 'rhymebrainRhyme') {
    return topResults(results, maxRhymes)
  } else if (api.type === 'rhymebrainPortmanteau') {
    return topResults(results, maxPortmanteaus)
  }

  return results
})

const callRhymebrainApi = (options) => {
  const baseOptions = {
    protocol: 'https',
    host: 'rhymebrain.com',
  }
  const combinedOptions = { ...baseOptions, ...options }

  return callApi(combinedOptions).pipe(map(processRhymebrainResult))
}

const callRhymeApi = (word) => {
  const rhymeApiOptions = {
    type: 'rhymebrainRhyme',
    path: 'talk?function=getRhymes&word=' + word,
  }

  return callRhymebrainApi(rhymeApiOptions)
}

const callWordInfoApi = (word) => {
  const wordInfoApiOptions = {
    type: 'rhymebrainWordInfo',
    path: 'talk?function=getWordInfo&word=' + word,
  }

  return callRhymebrainApi(wordInfoApiOptions)
}

const callPortmanteauApi = (word) => {
  const portmanteausApiOptions = {
    type: 'rhymebrainPortmanteau',
    path: 'talk?function=getPortmanteaus&word=' + word,
  }

  return callRhymebrainApi(portmanteausApiOptions)
}

// rhymebrain epic
// --------------------------------
const rhymebrainEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    map(extractCurrentWord),
    filterUnchangedOrEmpty(),
    switchMap(currentWord =>
      merge(
        // callRhymeApi(currentWord),
        callWordInfoApi(currentWord),
        callPortmanteauApi(currentWord),
      )
    )
  )

// selectors
// --------------------------------
const selectRhymes = state => state.api.rhymebrainRhyme.result
const selectWordInfo = state => state.api.rhymebrainWordInfo.result
const selectPortmanteaus = state => state.api.rhymebrainPortmanteau.result

// exports
// --------------------------------
export {
  rhymebrainEpic,
  selectRhymes,
  selectWordInfo,
  selectPortmanteaus,
}

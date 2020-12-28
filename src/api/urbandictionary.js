import { merge } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { isEmpty, get } from 'lodash'

import {
  callApi, extractCurrentWord,
  filterUnchangedOrEmpty, apiResultTransformer
} from 'api/api'

import { setCurrentWord } from 'editor/editorSlice'

// api calls
// --------------------------------

// urbandictionary organizes their results from most agreed upon to least.
// We only want the most agreed upon result
const processWordInfo = apiResultTransformer(results => get(results, 'list[0]', {}))

const callUrbandictionaryApi = (word) => {
  const options = {
    type: 'urbandictionaryWordInfo',
    protocol: 'https',
    host: 'mashape-community-urban-dictionary.p.rapidapi.com',
    path: 'define?term=' + word,
    headers: {
      'x-rapidapi-key': process.env.UD_API_KEY,
      'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
    },
  }

  return callApi(options).pipe(map(processWordInfo))
}

// urbandictionary epic
// --------------------------------
const urbandictionaryEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    map(extractCurrentWord),
    filterUnchangedOrEmpty(),
    switchMap(currentWord => callUrbandictionaryApi(currentWord))
  )

// selectors
// --------------------------------
const selectUdWordInfo = state => state.api.urbandictionaryWordInfo.result

// exports
// --------------------------------
export {
  urbandictionaryEpic,
  selectUdWordInfo,
}

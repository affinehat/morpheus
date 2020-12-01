import { of, pipe } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { distinctUntilKeyChanged, filter, catchError } from 'rxjs/operators'

const callAPI = options => {
  let url = `${options.protocol}://${options.host}/${options.path}`
  let method = options.method || 'GET'

  return ajax({url, method}).pipe(
    catchError(error => {
      console.error('api call error: ', options, error)
      return of(error)
    })
  )
}

const topResults = (ajax, numResults) =>
  ajax.response.length ? ajax.response.slice(0, numResults) : [];

const filterUnchangedOrEmpty = () =>
  pipe(
    distinctUntilKeyChanged("payload"),
    filter(action => action.payload.trim() !== "")
  );

export { callAPI, topResults, filterUnchangedOrEmpty }

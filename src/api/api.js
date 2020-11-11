import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError } from 'rxjs/operators'

export const callAPI = options => {
  let url = `${options.protocol}://${options.host}/${options.path}`
  let method = options.method || 'GET'

  return ajax({url, method}).pipe(
    catchError(error => {
      console.error('api call error: ', options, error)
      return of(error)
    })
  )
}

export default callAPI

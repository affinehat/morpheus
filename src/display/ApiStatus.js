import React from 'react'
import { useSelector } from 'react-redux'

export const ApiStatus = props => {
  // get list of api statuses from redux
  const apis = Object.values(useSelector(state => state.api))
  const apiStatus = apis.map(api => api.status)

  // if no api calls have been started, don't show the status
  // else any api calls have failed, status = error
  // else any api calls are loading, status = loading
  // else all api calls are loaded, status = done
  const hideStatus = apiStatus.every(e => e === 'not started')
  const failed = apiStatus.some(e => e === 'failure')
  const loading = apiStatus.some(e => e === 'started')
  const status = failed ? 'Error' : (loading ? 'Loading' : 'Done')

  return hideStatus ? null : (
    <div {...props}>Status: {status}</div>
  )
}

export default ApiStatus

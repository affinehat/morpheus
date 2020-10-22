import React from 'react'
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <p>Hello world</p>
        </Route>
      </Switch>
    </div>
  )
}

export default App

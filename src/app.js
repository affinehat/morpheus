import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LyricsEditor from 'editor/LyricsEditor'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div className="grid grid-cols-2">
            <LyricsEditor className="editor min-h-screen text-white border-4 border-blue-300 rounded-md" />
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App

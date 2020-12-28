import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Title from 'components/Title'
import LyricsEditor from 'editor/LyricsEditor'
import SidePanel from 'display/SidePanel'

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <div id="site-wrapper" className="h-screen min-h-site flex flex-col">
          <div className="flex-none">
            <Title id="title" className="text-5xl font-semibold border-b mb-4" title="Morpheus"/>
          </div>
          <div id="content-wrapper" className="flex-auto max-h-content grid grid-cols-2 gap-2">
            <LyricsEditor className="h-full editor text-white border-4 border-blue-300 rounded-md" />
            <SidePanel className="h-full flex flex-col"/>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default App

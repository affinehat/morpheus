import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Title from 'components/Title'
import LyricsEditor from 'editor/LyricsEditor'
import SidePanel from 'display/SidePanel'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div id="site-wrapper" className="flex flex-col h-screen">
            <Title id="title" className="flex-none text-5xl font-semibold border-b mb-4" title="Morpheus"/>
            <div id="content-wrapper" className="flex-auto grid grid-cols-2">
              <LyricsEditor className="flex-auto editor text-white border-4 border-blue-300 rounded-md" />
              <SidePanel className="flex-auto flex flex-col"/>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App

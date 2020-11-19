import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LyricsEditor from 'editor/LyricsEditor'
import APIsStatus from 'components/APIsStatus'
import RhymebrainInfoPanel from 'info/RhymebrainInfoPanel'
import DatamuseInfoPanel from 'info/DatamuseInfoPanel'

import { selectRhymes } from 'api/APIs/rhymebrain'
import { selectSynonyms } from 'api/APIs/datamuse'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div className="grid grid-cols-2">
            <LyricsEditor className="editor min-h-screen text-white border-4 border-blue-300 rounded-md" />
            <div className="min-h-screen">
              <APIsStatus className="ml-2 mb-8"/>
              <div className="min-h-vh grid grid-rows-6">
                <RhymebrainInfoPanel className="apiSection ml-2 mb-8"/>
                <DatamuseInfoPanel className="apiSection ml-2 mb-8"/>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App

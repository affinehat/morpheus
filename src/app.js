import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LyricsEditor from 'editor/LyricsEditor'
import APIsStatus from 'components/APIsStatus'
import InfoPanel from 'info/info-panel'
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
            <div>
              <APIsStatus className="mb-8"/>
              <InfoPanel className="apiSection mb-8" selectState={selectRhymes}/>
              <InfoPanel className="apiSection mb-8" selectState={selectSynonyms}/>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App

import React from 'react'

import ApiStatus from 'display/ApiStatus'
import DatamuseResults from 'display/DatamuseResults'
import RhymebrainResults from 'display/RhymebrainResults'
import UrbandictionaryResults from 'display/UrbandictionaryResults'

const SidePanel = (props) => {
  return (
    <aside {...props}>
      <div id="api-status-wrapper" className="flex-none">
        <ApiStatus className="mb-8" />
      </div>
      <div id="panel-wrapper" className="flex-auto max-h-panels grid grid-rows-panels-5">
        <RhymebrainResults type="Word info" className="pb-2" />
        <DatamuseResults type="Rhymes" className="pb-2" />
        <DatamuseResults type="Synonyms" className="pb-2" />
        <UrbandictionaryResults type="Urban Dictionary info" className="pb-2" />
        <RhymebrainResults type="Portmanteaus" className="pb-2" />
        {/*<RhymebrainResults type="Rhymes" className="pb-2" />*/}
      </div>
    </aside>
  )
}

export default SidePanel

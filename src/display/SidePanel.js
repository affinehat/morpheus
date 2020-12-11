import React from 'react'

import ApiStatus from 'display/ApiStatus'
import DatamuseResults from 'display/DatamuseResults'
import RhymebrainResults from 'display/RhymebrainResults'

const SidePanel = (props) => {
  const { className, ...otherProps } = props
  return (
    <aside className={className} {...otherProps}>
      <ApiStatus className="flex-none ml-2 mb-8" />
      <div id="panel-wrapper" className="flex-auto grid grid-rows-panels-4">
        <RhymebrainResults type="Word info" className="overflow-auto ml-2 mb-8" />
        <DatamuseResults type="Rhymes" className="overflow-auto ml-2 mb-8" />
        <DatamuseResults type="Synonyms" className="overflow-auto ml-2 mb-8" />
        <RhymebrainResults type="Portmanteaus" className="overflow-auto ml-2 mb-8" />
        {/*<RhymebrainResults type="Rhymes" className="ml-2 mb-8" />*/}
      </div>
    </aside>
  )
}

export default SidePanel

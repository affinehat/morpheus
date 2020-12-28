import React from 'react'
import { connect } from 'react-redux'

import Panel from 'components/Panel'
import PropertyList, { objToArr } from 'components/PropertyList'
import { selectUdWordInfo } from 'api/urbandictionary'

export const UrbandictionaryResults = props => {
  const { udWordInfo = {}, type, dispatch, ...otherProps } = props
  const displayedUdWordInfo = {}
  const propNamesMap = {
    definition: "Definition",
    example: "Example",
  }

  // shows Urban dictionary definition and example sentence
  if (type === 'Urban Dictionary info') {
    Object.keys(udWordInfo)
    .forEach(key => {
      const newKey = propNamesMap[key]

      if (!!newKey)
        displayedUdWordInfo[newKey] = udWordInfo[key]
    })
  } else {
    console.error('UrbandictionaryResults: invalid result type', type)
  }

  return (
    <Panel {...otherProps}>
      <h3>{type}:</h3>
      <div className="mx-6">
        <PropertyList info={displayedUdWordInfo} emptyMessage="No matches found."/>
      </div>
    </Panel>
  )
}

const mapState = state => {
  return {udWordInfo: selectUdWordInfo(state)}
}

export default connect(mapState)(UrbandictionaryResults)

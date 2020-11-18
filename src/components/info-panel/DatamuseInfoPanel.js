import React from 'react'
import { connect } from 'react-redux'

import { selectSynonyms } from 'api/APIs/datamuse'

export const DatamuseInfoPanel = props => {
  const { synonyms, ...otherProps } = props

  return (
    <div {...otherProps}>
    <h3>Synonyms:</h3>
    <div className="grid grid-cols-4 auto-rows-min mx-6">
      {synonyms && synonyms.map((s, ind) => (<span key={ind}>{s.word}</span>))}
    </div>
    </div>
  )
}

const mapState = state => {
  return { synonyms: selectSynonyms(state) }
}

export default connect(mapState)(DatamuseInfoPanel)

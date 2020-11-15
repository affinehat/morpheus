import React from 'react'
import { connect } from 'react-redux'

import { selectRhymes } from 'api/APIs/rhymebrain'

export const RhymebrainInfoPanel = props => {
  const { rhymes, ...otherProps } = props

  return (
    <div className="apiSection">
    <h3 className="apiHeading">Rhymes:</h3>
    <div className="grid grid-cols-4 auto-rows-min mx-6">
      {rhymes ? rhymes.map((r, ind) => (<span key={ind}>{r.word}</span>)) : null}
    </div>
    </div>
  )
}

const mapState = state => {
  return { rhymes: selectRhymes(state) }
}

export default connect(mapState)(RhymebrainInfoPanel)

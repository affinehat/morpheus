import React from 'react'
import { connect } from 'react-redux'

import { selectRhymes } from 'api/APIs/rhymebrain'

export const RhymebrainInfoPanel = props => {
  const { rhymes, ...otherProps } = props

  return (
    <div {...otherProps}>
    <h3>Rhymes:</h3>
    <div className="grid grid-cols-4 auto-rows-min mx-6">
      {rhymes && rhymes.map((r, ind) => (<span key={ind}>{r.word}</span>))}
    </div>
    </div>
  )
}

const mapState = state => {
  return { rhymes: selectRhymes(state) }
}

export default connect(mapState)(RhymebrainInfoPanel)

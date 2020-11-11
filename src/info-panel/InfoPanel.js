import React from 'react'
import { connect } from 'react-redux'

import { selectRhymes } from 'api/rhymebrain'

export const InfoPanel = props => {
  const { rhymes, ...otherProps } = props

  return (
    <div className="grid grid-cols-4 auto-rows-min mx-6">
      {rhymes ? rhymes.map(r => (<span>{r.word}</span>)) : null}
    </div>
  )
}

const mapState = state => {
  return { rhymes: selectRhymes(state) }
}

export default connect(mapState)(InfoPanel)

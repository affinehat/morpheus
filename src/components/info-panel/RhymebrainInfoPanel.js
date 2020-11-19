import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from 'info/InfoPanel'
import { selectRhymes } from 'api/APIs/rhymebrain'

const RhymebrainInfoPanel = props => {
  const { rhymes, ...otherProps } = props

  return <InfoPanel {...otherProps} apiType="Rhymes" apiResults={rhymes}/>
}

const mapState = state => {
  return { rhymes: selectRhymes(state) }
}

export default connect(mapState)(RhymebrainInfoPanel)

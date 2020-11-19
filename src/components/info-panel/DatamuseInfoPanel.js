import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from 'info/InfoPanel'
import { selectSynonyms } from 'api/APIs/datamuse'

const DatamuseInfoPanel = props => {
  const { synonyms, ...otherProps } = props

  return <InfoPanel {...otherProps} apiType="Synonyms" apiResults={synonyms}/>
}

const mapState = state => {
  return { synonyms: selectSynonyms(state) }
}

export default connect(mapState)(DatamuseInfoPanel)

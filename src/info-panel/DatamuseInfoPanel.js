import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from 'info/InfoPanel'
import { selectRhymes, selectSynonyms } from 'api/Reducers&Epics/datamuse'

/************Datamuse Rhyme Info-panel***************/

const DatamuseRhymeInfoPanelUnconnected = props => {
  const { rhymes, ...otherProps } = props

  return <InfoPanel {...otherProps} apiType="Rhymes" apiResults={rhymes}/>
}

const mapStateRhymes = state => {
  return { rhymes: selectRhymes(state) }
}

export const DatamuseRhymeInfoPanel = connect(mapStateRhymes)(DatamuseRhymeInfoPanelUnconnected)

/************Datamuse Synonym Info-panel***************/

const DatamuseSynonymInfoPanelUnconnected = props => {
  const { synonyms, ...otherProps } = props

  return <InfoPanel {...otherProps} apiType="Synonyms" apiResults={synonyms}/>
}

const mapStateSynonyms = state => {
  return { synonyms: selectSynonyms(state) }
}

export const DatamuseSynonymInfoPanel = connect(mapStateSynonyms)(DatamuseSynonymInfoPanelUnconnected)

import React from 'react'
import { connect } from 'react-redux'

import Panel from 'components/Panel'
import WordGrid from 'components/WordGrid'
import { selectRhymes, selectSynonyms } from 'api/datamuse'


export const DatamuseResults = props => {
  const { rhymes, synonyms, type, dispatch, ...otherProps } = props
  let words = []

  // show either rhymes or synonyms based on `type` prop
  if (type === 'Rhymes') {
    words = rhymes
  } else if (type === 'Synonyms') {
    words = synonyms
  } else {
    console.error('DatamuseResults: invalid result type', type)
  }

  return (
    <Panel {...otherProps}>
      <h3>{type}:</h3>
      <div className="overflow-y-auto max-h-data mx-6">
        <WordGrid col={4} words={words} emptyMessage="No matches found."/>
      </div>
    </Panel>
  )
}

const mapState = state => {
  const extractWords = results => results ? results.map(x => x.word) : []

  return {
    rhymes: extractWords(selectRhymes(state)),
    synonyms: extractWords(selectSynonyms(state)),
  }
}

export default connect(mapState)(DatamuseResults)

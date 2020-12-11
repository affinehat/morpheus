import React from 'react'
import { connect } from 'react-redux'

import Panel from 'components/Panel'
import WordGrid from 'components/WordGrid'
import PropertyList from 'components/PropertyList'
import { selectRhymes, selectWordInfo, selectPortmanteaus } from 'api/rhymebrain'

export const RhymebrainResults = props => {
  const { rhymes, wordInfo = {}, portmanteaus = [], type, dispatch, ...otherProps } = props
  let words = []
  const displayedWordInfo = {}
  const propNamesMap = {
    word: "Word",
    pron: "Pronunciation",
    ipa: "IPA",
    syllables: "Syllables",
  }

  // show rhymes, portmanteaus or wordInfo based on `type` prop
  if (type === 'Rhymes') {
    words = rhymes
  } else if (type === 'Portmanteaus') {
    // formats pormanteaus to: `${source1} + ${source2}... = ${result1} or ${result2}...`
    words = portmanteaus.map(entry => {
      const sourceWords = entry.source.split(',')
      const combinedWords = entry.combined.split(',')
      return `${sourceWords.join(' + ')} = ${combinedWords.join(' or ')}`
    })
  } else if (type === 'Word info') {
     Object.keys(wordInfo)
     .forEach(key => {
       const newKey = propNamesMap[key]

       if (!!newKey)
         displayedWordInfo[newKey] = wordInfo[key]
     })
   } else {
    console.error('RhymebrainResults: invalid result type', type)
  }

  // decides which display component to use based on the type prop
  const selectDisplay = () => {
    if (type === 'Rhymes') {
      return <WordGrid col={4} words={words} emptyMessage="No matches found."/>
    } else if (type === 'Portmanteaus') {
      return <WordGrid col={1} words={words} emptyMessage="No matches found."/>
     } else if (type === 'Word info') {
       return <PropertyList info={displayedWordInfo} emptyMessage="No matches found."/>
     }
  }

  return (
    <Panel {...otherProps}>
      <h3>{type}:</h3>
        <div className="mx-6">
          {selectDisplay()}
        </div>
    </Panel>
  )
}

const mapState = state => {
  // pulls the 'word' key (rhymes) out of rhymebrainRhyme
  const extractRhymes = results => results ? results.map(x => x.word) : []

  return {
    rhymes: extractRhymes(selectRhymes(state)),
    wordInfo: selectWordInfo(state),
    portmanteaus: selectPortmanteaus(state),
  }
}

export default connect(mapState)(RhymebrainResults)

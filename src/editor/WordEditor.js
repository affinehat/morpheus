import React from 'react'
import { connect } from 'react-redux'

import RhymeInput from 'components/RhymeInput'
import { setWord } from 'editor/wordSlice'

export const WordEditor = props => {
  const { word, setWord, ...otherProps } = props
  return (
    <RhymeInput {...otherProps} value={word} onChange={setWord}/>
  )
}

const mapDispatch = { setWord }

const mapState = state => {
  return { word: state.editor.word }
}

export default connect(mapState, mapDispatch)(WordEditor)

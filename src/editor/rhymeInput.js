import React from 'react'
import { connect } from 'react-redux'

import RhymeInput from 'components/RhymeInput'
import { setText } from 'editor/tempInputSlice'

export const rhymeInput = props => {
  const { text, setText, ...otherProps } = props
  return (
    <RhymeInput {...otherProps} value={text} onChange={setText}/>
  )
}

const mapDispatch = { setText }

const mapState = state => {
  return { text: state.editor.text }
}

export default connect(mapState, mapDispatch)(LyricsEditor)

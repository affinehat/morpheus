import React from 'react'
import { connect } from 'react-redux'

import ControlledTextarea from 'components/ControlledTextarea'
import { setText } from 'editor/editorSlice'

export const LyricsEditor = props => {
  const { text, setText, ...otherProps } = props
  return (
    <ControlledTextarea {...otherProps} value={text} onChange={setText}/>
  )
}

const mapDispatch = { setText }

const mapState = state => {
  return { text: state.editor.text }
}

export default connect(mapState, mapDispatch)(LyricsEditor)

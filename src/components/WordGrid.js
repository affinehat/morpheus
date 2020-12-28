import React from 'react'

export const WordGrid = props => {
  const { col, words, emptyMessage, ...otherProps } = props
  const classes = `grid grid-cols-${col} auto-rows-min`

  // input must be an array
  if (!Array.isArray(words)) {
    console.error('WordGrid: expected words to be array but received', words)
    words = []
  }

  // show words in a grid if they exist, otherwise show the empty message
  const showEmptyMessage = <span>{emptyMessage}</span>
  const gridWrapper = words.map(
    (word, index) => (<span key={index}>{word}</span>)
  )
  const showGrid = (grid) => {
    return <div className={classes}> {grid} </div>
  }

  return (words.length ? showGrid(gridWrapper) : showEmptyMessage)
}

export default WordGrid

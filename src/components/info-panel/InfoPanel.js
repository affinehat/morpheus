import React from 'react'

const InfoPanel = props => {
  const { apiType, apiResults, ...otherProps } = props

  return (
    <div {...otherProps}>
    <h3>{apiType}:</h3>
      <div className="grid grid-cols-4 auto-rows-min mx-6">
        {apiResults && apiResults.map((result, ind) => (<span key={ind}>{result.word}</span>))}
      </div>
    </div>
  )
}

export default InfoPanel;

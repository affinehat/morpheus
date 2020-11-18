import React from 'react'
import { connect } from 'react-redux'

const InfoPanel = props => {
  const { apiResult, selectState, ...otherProps } = props

  return (
    <div {...otherProps}>
    <h3>Rhymes:</h3>
      <div className="grid grid-cols-4 auto-rows-min mx-6">
        {apiResult && apiResult.map((ele, ind) => (<span key={ind}>{ele.word}</span>))}
      </div>
    </div>
  )
}

const mapState = state => {
  return { apiResult: selectState(state) }
}

export default connect(mapState)(InfoPanel)

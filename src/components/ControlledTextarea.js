import React from 'react'

export const ControlledTextarea = props => {
  const { onChange :onChangeProp, ...otherProps } = props

  const processChange = event => {
    const value = event.target.value
    onChangeProp(value)
  }


  return (
    <textarea {...otherProps} onChange={processChange}/>
  )
}

export default ControlledTextarea


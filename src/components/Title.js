import React from 'react'

const Title = (props) => {
  const { title, ...otherProps } = props
  return <h1 {...otherProps}>{title}</h1>
}

export default Title

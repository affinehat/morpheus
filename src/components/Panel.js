import React from 'react'

// simple panel container that wraps content with a div[class=panel]
export const Panel = (props) => {
  const { children, className, ...otherProps } = props
  const classes = 'panel ' + className

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  )
}

export default Panel

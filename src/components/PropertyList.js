import React from 'react'
import { isEmpty } from 'lodash'

export const PropertyList = props => {
  const { info, emptyMessage, ...otherProps } = props

  // list the info if any exists, otherwise shows the empty message
  const showEmptyMessage = <span>{emptyMessage}</span>
  const infoWrapper = Object.entries(info).map((entry, index) =>
    [
      <dt className="text-right">
        {entry[0]}:
      </dt>,
      <dd className="mx-6">
        {entry[1]}
      </dd>
    ]
  )

  const showInfo = (info) => {
    return (
      <dl className="grid grid-cols-property-list"> {info.map(entry => entry)} </dl>
    )
  }

  return isEmpty(info) ? showEmptyMessage : showInfo(infoWrapper)
}

export default PropertyList

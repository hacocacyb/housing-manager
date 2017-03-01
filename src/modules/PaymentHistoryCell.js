import React from 'react'

export default (props) => {
  let valueClass = "w3-rest ";
  if (props.align === 'right') {
    valueClass += 'w3-right'
  }
  return (
    <div className="w3-half w3-row">
      <div className="w3-third">{props.label}:</div>
      <div className={valueClass}>{props.value}</div>
    </div>
  )
}

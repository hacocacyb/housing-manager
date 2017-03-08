import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default (props) => {
let valueClass;
  if (props.align === 'right') {
    valueClass += 'text-right'
  }
  return (
    <Row className="w3-half w3-row">
      <div className="w3-third">{props.label}:</div>
      <div className={valueClass}>{props.value}</div>
    </Row>
  )
}

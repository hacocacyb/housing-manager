import React from 'react'
import { Row, Col } from 'react-bootstrap'
import currency from '../../fn/formatCurrency'

export default (props) => {
  return (
    <Row key={props.key} className="w3-row">
      <Col xs={3} >{props.date}</Col>
      <Col xs={3} className="text-right">{props.cost ? currency(props.cost) : '-'}</Col>
      <Col xs={3} className="text-right">{props.payment ? currency(props.payment) : '-'}</Col>
      <Col xs={3} className="text-right">{currency(props.balance)}</Col>
    </Row>
  )
}

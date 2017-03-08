import React from 'react'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import currency from '../../fn/formatCurrency'

export default ({payHistory, visit}) => {
  const { totalBilled, totalPaid, balance } = payHistory;

  const intakeDate = moment(visit.intake).format('MM/DD/YYYY');
  return (
    <h5>
      <Row>
        <Col xs={3}>Visitor</Col>
        <Col xs={3}>{visit.first + ' ' + visit.last}</Col>
        <Col xs={3}>Total Billed</Col>
        <Col xs={3} className="text-align">{currency(totalBilled)}</Col>
      </Row>
      <Row>
        <Col xs={3}>Intake</Col>
        <Col xs={3}>{intakeDate}</Col>
        <Col xs={3}>Total Paid</Col>
        <Col xs={3} className="text-align">{currency(totalPaid)}</Col>
      </Row>
      <Row>
        <Col xs={3}>Outtake</Col>
        <Col xs={3}>{"N/A"}</Col>
        <Col xs={3}>Balance</Col>
        <Col xs={3} className="text-align">{currency(balance)}</Col>
      </Row>
    </h5>
  )
}

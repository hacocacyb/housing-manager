import React from 'react'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import currency from '../../fn/formatCurrency'

function HeaderRow(props) {
  const data = props.data;
  let className = 'text-right'
  if (props.underline) {
    className += ' underline'
  }
  return (
    <Row>
      <Col xs={3} md={2} className="payment-history-label">{data[0]}:</Col>
      <Col xs={3} md={4} >{data[1]}</Col>
      <Col xs={3} md={2} className="payment-history-label">{data[2]}:</Col>
      <Col xs={3} md={4} className={className} >{currency(data[3])}</Col>
    </Row>
  )
}

export default ({payHistory, visit}) => {
  const { totalBilled, totalPaid, balance } = payHistory;

  const intakeDate = moment(visit.intake).format('MM/DD/YYYY');
  const outtakeDate = visit.outtake ? moment(visit.outtake).format('MM/DD/YYYY') : 'N/A'
  return (
    <div>
      <HeaderRow data={['Visitor', visit.first + ' ' + visit.last, 'Total Billed', totalBilled]}/>
      <HeaderRow underline={true} data={['Intake', intakeDate, 'Total Paid', totalPaid]}/>
      <HeaderRow data={['End Date', outtakeDate, 'Balance', balance]}/>
    </div>
  )
}

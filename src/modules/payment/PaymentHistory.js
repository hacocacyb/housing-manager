import React from 'react'
import moment from 'moment'
import { Panel, Row, Col } from 'react-bootstrap'
import Cell from './PaymentHistoryCell'
import DataRow from './PaymentHistoryDataRow'
import currency from '../../fn/formatCurrency'

class PaymentHistory extends React.Component {

  buildPayHistory(visit, payments) {
    const { intake, rentalPeriodId, cost } = visit;
    const payPeriodDays = rentalPeriodId === 1 ? 7 : 14;
    const today = moment(moment.now());
    const startDate = moment.utc(intake);
    let billDate = startDate;
    let ledger = [];
    let history = [];
    let totalBilled = 0;

    while (billDate < today) {
      totalBilled += cost;
      ledger.push({
        date: moment(billDate),
        cost: cost,
        type: 'debit'

      })
      billDate = billDate.add(payPeriodDays, 'days');
    }

    if ( payments ) {
      payments.forEach(function(payment) {
        ledger.push({
          date: moment.utc(payment.payDate),
          payment: payment.amount,
          type: 'credit'
        })
      })

    }

    ledger.sort(function(a,b) {
      if (a.date.isSame(b.date)) {
        if (a.payment === undefined) {
          return 1
        } else {
          return 0;
        }
      } else {
        return a.date - b.date;
      }
    })

    let balance = 0;
    let totalPaid = 0;
    ledger.forEach(function(row, ix) {
      let dateFormat = row.date.format('MM/DD/YYYY');
      if (row.cost) {
        balance += row.cost;
      }
      if (row.payment) {
        balance -= row.payment;
        totalPaid += row.payment;
      }
      history.push(
        <DataRow
          key={ix}
          date={dateFormat}
          cost={row.cost}
          payment={row.payment}
          balance={balance}
        ></DataRow>
      )
    });

    return {
      history,
      totalBilled,
      totalPaid,
      balance
    };
  }

  render() {
    const props = this.props;
    const { visit, payments } = props;
    if (visit) {
      const payHistory = this.buildPayHistory(visit, payments);
      const { totalBilled, totalPaid, balance, history } = payHistory;
      const intakeDate = moment(visit.Intake).format('MM/DD/YYYY');

      const header = (
        <h5>
          <Row>
            <Col xs={3}>Visitor</Col>
            <Col xs={3}>{visit.first + ' ' + visit.last}</Col>
            <Col xs={3}>Total Billed</Col>
            <Col xs={3} className="text-align">{currency(totalBilled)}</Col>
          </Row>
          <Row className="w3-row">
            <Col xs={3}>Intake</Col>
            <Col xs={3}>{intakeDate}</Col>
            <Col xs={3}>Total Paid</Col>
            <Col xs={3} className="text-align">{currency(totalPaid)}</Col>
          </Row>
          <Row className="w3-row">
            <Col xs={3}>Outtake</Col>
            <Col xs={3}>{"N/A"}</Col>
            <Col xs={3}>Balance</Col>
            <Col xs={3} className="text-align">{currency(balance)}</Col>
          </Row>
        </h5>
      )
      return (
        <Panel className="payment-history-panel" header={header}>
          <Row className="payment-history-ledger-header">
            <Col xs={3}>Date</Col>
            <Col xs={3} className="text-right" >Invoice</Col>
            <Col xs={3} className="text-right" >Payment</Col>
            <Col xs={3} className="text-right" >Balance</Col>
          </Row>
          {history}
        </Panel>)
    } else {
      return <div></div>
    }
  }
}

export default PaymentHistory;

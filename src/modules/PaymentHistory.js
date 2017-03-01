import React from 'react'
import moment from 'moment'
import Cell from './PaymentHistoryCell'
import DataRow from './PaymentHistoryDataRow'
import currency from '../fn/formatCurrency'

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
      return (
        <div className="w3-container w3-rest">
          <div className="w3-panel">
            <h5 className=" w3-safety-purple w3-padding w3-round-large">
              <div className="w3-row">
                <Cell label={"Visitor"} value={visit.first + ' ' + visit.last} />
                <Cell label={"Total Billed"} value={currency(totalBilled)} align={"right"}/>
              </div>
              <div className="w3-row">
                <Cell label={"Intake"} value={intakeDate} />
                <Cell label={"Total Paid"} value={currency(totalPaid)} align={"right"}/>
              </div>
              <div className="w3-row">
                <Cell label={"Outtake"} value={"N/A"} />
                <Cell label={"Balance"} value={currency(balance)} align={"right"}/>
              </div>
            </h5>
            <div className="w3-row w3-border-bottom">
              <div className="w3-quarter">Date</div>
              <div className="w3-quarter w3-right-align w3-padding-right" >Invoice</div>
              <div className="w3-quarter w3-right-align w3-padding-right" >Payment</div>
              <div className="w3-quarter w3-right-align w3-padding-right" >Balance</div>
            </div>
            {history}
        </div>
      </div>)
    } else {
      return <div></div>
    }
  }
}

export default PaymentHistory;

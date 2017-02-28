import React from 'react'
import moment from 'moment'

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});
var currency = function(v) {
  return formatter.format(v);
}

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
        <div key={ix} className="w3-row">
          <div className="w3-quarter" >{dateFormat}</div>
          <div className="w3-quarter w3-right-align w3-padding-right">{row.cost ? currency(row.cost) : '-'}</div>
          <div className="w3-quarter w3-right-align w3-padding-right">{row.payment ? currency(row.payment) : '-'}</div>
          <div className="w3-quarter w3-right-align w3-padding-right">{currency(balance)}</div>
        </div>
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
            <h5 className=" w3-safety-purple w3-padding">
              <div className="w3-row">
                <div className="w3-half w3-row">
                  <div className="w3-third">Visitor:</div>
                  <div className="w3-rest">{visit.first + ' ' + visit.last}</div>
                </div>
                <div className="w3-half w3-row">
                  <div className="w3-half">Total Billed:</div>
                  <div className="w3-rest w3-right">{currency(totalBilled)}</div>
                </div>
              </div>
              <div className="w3-row">
                <div className="w3-half w3-row">
                  <div className="w3-third">Intake:</div>
                  <div className="w3-rest">{intakeDate}</div>
                </div>
                <div className="w3-half w3-row">
                  <div className="w3-half">Total Paid:</div>
                  <div className="w3-rest w3-right">{currency(totalPaid)}</div>
                </div>
              </div>
              <div className="w3-row">
                <div className="w3-half w3-row">
                  <div className="w3-third">Outtake:</div>
                  <div className="w3-rest">N/A</div>
                </div>
                <div className="w3-half w3-row">
                  <div className="w3-half">Balance:</div>
                  <div className="w3-rest w3-right">{currency(balance)}</div>
                </div>
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

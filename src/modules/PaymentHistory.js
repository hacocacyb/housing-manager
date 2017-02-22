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
    const { Intake, PayTypeId, Cost } = visit;
    const payPeriodDays = PayTypeId === 1 ? 7 : 14;
    const today = moment(moment.now());

    const startDate = moment(Intake);
    let billDate = startDate;
    let ledger = [];
    let history = [];
    let totalBilled = 0;

    while (billDate < today) {
      totalBilled += Cost;
      ledger.push({
        date: moment(billDate),
        cost: Cost,
        type: 'debit'

      })
      billDate = billDate.add(payPeriodDays, 'days');
    }

    if ( payments ) {
      payments.forEach(function(payment) {
        ledger.push({
          date: moment(payment.PayDate),
          payment: payment.Amount,
          type: 'credit'
        })
      })

    }

    ledger.sort(function(a,b) {
      return a.date - b.date;
    })

    let balance = 0;
    let totalPaid = 0;
    ledger.forEach(function(row, ix) {
      let dateFormat = row.date.format('YYYY-MM-DD');
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
      const intakeDate = moment(visit.Intake).format('YYYY-MM-DD');
      return (
        <div className="w3-container w3-rest">
          <div className="w3-panel">
            <h5 className=" w3-green w3-padding">
              <div className="w3-row">
                <div className="w3-half w3-row">
                  <div className="w3-third">Visitor:</div>
                  <div className="w3-rest">{visit.First + ' ' + visit.Last}</div>
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
              <div className="w3-quarter" >Date</div>
              <div className="w3-quarter w3-right-align w3-padding-right" >Debits</div>
              <div className="w3-quarter w3-right-align w3-padding-right" >Credits</div>
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

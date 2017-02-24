import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { getPaymentsWidget } from '../../data/actions/payment'
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});
var currency = function(v) {
  return formatter.format(v);
}
class BillingWidget extends React.Component {

	componentWillMount() {
		this.props.dispatch(getPaymentsWidget())
	}

	render() {
		const data = this.props.widgetData;
		const list = data && data.map((d) => {
			return <div key={d.VisitId} className="w3-row w3-border-top"
				onDoubleClick={()=>hashHistory.push('/payment/' + d.VisitId)}
			>
				<span className="w3-col s6">{d.FullName}</span>
				<span className="w3-col s6 w3-center">{currency(d.PastDue)}</span>
			</div>
		})

		return (
      <div className={"w3-card-4 " + this.props.className }>
				<header className="w3-container w3-red">Past Due Statements</header>
				<div className="w3-container">
					<div className="w3-row w3-border-bottom">
						<span className="w3-col s6">Visitor</span>
						<span className="w3-col s6 w3-center">Past Due</span>
					</div>
					{list}
				</div>
      </div>
		 );
	}
}

export default connect((store) => {
	return { ...store.payments };
})(BillingWidget);

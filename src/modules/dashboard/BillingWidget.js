import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

class BillingWidget extends React.Component {

	render() {

		return (
      <div className={"w3-card-4 " + this.props.className } onDoubleClick={()=>hashHistory.push('/beds')}>
				<header className="w3-container w3-blue">Billing</header>
				<div className="w3-container">
					<div className="w3-row">
						<span className="w3-col s6 l6">Past Due Statements</span>
						<span className="w3-col s6 l6 w3-center">4</span>
					</div>
					<div className="w3-row">
						<span className="w3-col s6 l6">Visits Ending in Next 5 days</span>
						<span className="w3-col s6 l6 w3-center">2</span>
					</div>
					<div className="w3-row">
						<span className="w3-col s6 l6">Visitors with Payments due today</span>
						<span className="w3-col s6 l6 w3-center">1</span>
					</div>
				</div>
      </div>
		 );
	}
}

export default connect((store) => {
	return {...store.beds};
})(BillingWidget);

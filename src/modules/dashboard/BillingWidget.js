import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
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
			return <Row className="widget-row" key={d.visitId}
				onDoubleClick={()=>hashHistory.push('/payment/' + d.VisitId)}
			>
				<Col xs={6}>{d.fullName}</Col>
				<Col className="text-right" xs={6}>{currency(d.pastDue)}</Col>
			</Row>
		})
    const title = <h3><Link to="/payments">Past Due</Link></h3>

		return (
      <Panel header={title} bsStyle="danger" >
				<Row className="widget-header-row">
					<Col bsStyle="font-weight-bold" xs={6}>Visitor</Col>
					<Col className="text-right" xs={6}>Past Due</Col>
        </Row>
				{list}
      </Panel>
		 );
	}
}

export default connect((store) => {
	return { ...store.payments };
})(BillingWidget);

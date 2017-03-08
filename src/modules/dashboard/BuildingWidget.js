import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BuildingWidget extends React.Component {

	render() {
		const data = this.props.data.map((d) => d);
		data.sort(function(a, b) {
			return b.occupied - a.occupied;
		})
		const rows = data.map(function(d) {
			return (
				<Row className="widget-row" key={"widget-row-" + d.name}>
					<Col xs={6}>{d.name}</Col>
					<Col className="text-center" xs={6}>{d.occupied + ' / ' + d.bedCount}</Col>
				</Row>
			)
		})
		const title = <h3><Link to="/buildings">Buildings</Link></h3>
		return (
      <Panel header={title} bsStyle="info" >
				<Row className="widget-header-row">
					<Col xs={6}>Building</Col>
					<Col className="text-center" xs={6}>Occupied Beds</Col>
				</Row>
				{rows}
      </Panel>
		 );
	}
}

export default connect((store) => {
	return {...store.buildings};
})(BuildingWidget);

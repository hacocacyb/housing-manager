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
				<Row key={"widget-row-" + d.name}>
					<Col xs={4}>{d.name}</Col>
					<Col className="text-right" xs={4}>{d.bedCount}</Col>
					<Col className="text-right" xs={4}>{d.occupied}</Col>
				</Row>
			)
		})
		const title = <h3><Link to="/buildings">Buildings</Link></h3>
		return (
      <Panel header={title} >
				<Row>
					<strong>
						<Col xs={4}>Building</Col>
						<Col className="text-right" xs={4}>Beds</Col>
						<Col className="text-right" xs={4}>Occupied</Col>
					</strong>
				</Row>
				{rows}
      </Panel>
		 );
	}
}

export default connect((store) => {
	return {...store.buildings};
})(BuildingWidget);

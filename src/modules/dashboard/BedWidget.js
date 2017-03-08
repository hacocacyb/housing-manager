import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BedWidget extends React.Component {

	render() {
		const rows = this.props.data;
		let beds = 0;
		let occupied = 0;
		rows.forEach((row) => {
			beds++;
			row.occupied && occupied++
		});
		let occupancy = (beds === 0) ? 0 : (occupied/beds) * 100;
		occupancy = occupancy.toFixed(2);


	 const title = <h3><Link to="/beds">Beds</Link></h3>
 		return (
       <Panel header={title} bsStyle="success" >
 				<Row className="widget-row">
					<Col xs={6}>Occupancy</Col>
					<Col className="text-right" xs={6}>{occupancy + '%'}</Col>
 				</Row>
				<Row className="widget-row">
					<Col xs={6}>Total Beds</Col>
					<Col className="text-right" xs={6}>{beds}</Col>
 				</Row>
				<Row className="widget-row">
					<Col xs={6}>Occupied Beds</Col>
					<Col className="text-right" xs={6}>{occupied}</Col>
 				</Row>
       </Panel>
 		 );
	}
}

export default connect((store) => {
	return {...store.beds};
})(BedWidget);

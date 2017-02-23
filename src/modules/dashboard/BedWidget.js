import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

class BedWidget extends React.Component {

	render() {
		const rows = this.props.data;
		let beds = 0;
		let occupied = 0;
		rows.forEach((row) => {
			beds++;
			row.Occupied && occupied++
		});
		let occupancy = (beds === 0) ? 0 : (occupied/beds) * 100;
		occupancy = occupancy.toFixed(2);

		return (
      <div className={"w3-card-4 " + this.props.className } onDoubleClick={()=>hashHistory.push('/beds')}>
				<header className="w3-container w3-blue">Beds</header>
				<div className="w3-container">
					<div className="w3-row">
						<span className="w3-col s6 l6">Occupancy</span>
						<span className="w3-col s6 l6 w3-center">{occupancy + '%'}</span>
					</div>
					<div className="w3-row">
						<span className="w3-col s6 l6">Total Beds</span>
						<span className="w3-col s6 l6 w3-center">{beds}</span>
					</div>
					<div className="w3-row">
						<span className="w3-col s6 l6">Occupied Beds</span>
						<span className="w3-col s6 l6 w3-center">{occupied}</span>
					</div>
				</div>
      </div>
		 );
	}
}

export default connect((store) => {
	return {...store.beds};
})(BedWidget);

import React from 'react';
import { connect } from 'react-redux'


class Room extends React.Component {


	render() {

		return (
		  <div>Rooms!</div>
		 );
	}

}

export default connect((store) => {
	return {...store};
})(Room);

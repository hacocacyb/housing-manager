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
	console.log(store);
	return {...store};
})(Room);

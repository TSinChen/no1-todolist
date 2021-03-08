import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import MyTasks from './Tasks';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<div className="body">
					<MyTasks />
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		currentPage: state.currentPage,
	};
};

export default connect(mapState, null)(App);

import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage } from '../store/actionCreators';

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="navbar">
					<div
						className={`nav-item${
							this.props.currentPage === 'myTasks'
								? ' active'
								: ''
						}`}
						onClick={() => this.props.setCurrentPage('myTasks')}
					>
						My Tasks
					</div>
					<div
						className={`nav-item${
							this.props.currentPage === 'inProgress'
								? ' active'
								: ''
						}`}
						onClick={() => this.props.setCurrentPage('inProgress')}
					>
						In Progress
					</div>
					<div
						className={`nav-item${
							this.props.currentPage === 'completed'
								? ' active'
								: ''
						}`}
						onClick={() => this.props.setCurrentPage('completed')}
					>
						Completed
					</div>
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

export default connect(mapState, { setCurrentPage })(Header);

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { onAddTaskClick } from '../store/actionCreators';

class AddTask extends React.Component {
	render() {
		return (
			<Fragment>
				{this.props.isAddTaskOpen ? null : (
					<div
						className="btn-add-task"
						onClick={() => this.props.onAddTaskClick()}
					>
						<i className="fas fa-plus"></i> Add Task
					</div>
				)}
			</Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		isAddTaskOpen: state.isAddTaskOpen,
	};
};

export default connect(mapState, { onAddTaskClick })(AddTask);

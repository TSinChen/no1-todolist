import React from 'react';
import { connect } from 'react-redux';
import {
	onAddTaskCancel,
	onAddNewTask,
	setTaskStar,
	openEditTask,
	closeEditTask,
	editTaskDetail,
	saveEditTask,
	changeTaskCheck,
} from '../store/actionCreators';

class InProgress extends React.Component {
	render() {
		return <div>InProgress</div>;
	}
}

export default connect(null, {
	onAddTaskCancel,
	onAddNewTask,
	setTaskStar,
	openEditTask,
	closeEditTask,
	editTaskDetail,
	saveEditTask,
	changeTaskCheck,
})(InProgress);

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
	onAddTaskCancel,
	onNewTaskChange,
	onAddNewTask,
	orderTasks,
} from '../store/actionCreators';

class AddTaskOpen extends React.Component {
	render() {
		return (
			<Fragment>
				<div className="add-task-open">
					<div className="add-task-header">
						<input
							className="task-checkbox"
							type="checkbox"
							disabled
						/>
						<input
							className="task-title-input"
							onChange={(e) =>
								this.props.onNewTaskChange(
									'title',
									e.target.value
								)
							}
							placeholder="Type Something Here..."
						/>
						<i
							className={`fa-star ${
								this.props.newTaskDetail.star
									? 'star fas'
									: 'far'
							}`}
							onClick={() => this.props.onNewTaskChange('star')}
						></i>
						<i className="fas fa-pen active"></i>
					</div>
					<div className="add-task-detail">
						<div className="task-detail-item">
							<div className="task-detail-title">
								<div className="detail-title-icon">
									<i className="far fa-calendar-alt"></i>
								</div>
								<label>Deadline</label>
							</div>
							<div className="task-detail-form">
								<input
									type="date"
									onChange={(e) =>
										this.props.onNewTaskChange(
											'deadlineDate',
											e.target.value
										)
									}
								/>
								<input
									type="time"
									onChange={(e) =>
										this.props.onNewTaskChange(
											'deadlineTime',
											e.target.value
										)
									}
								/>
							</div>
						</div>
						<div className="task-detail-item">
							<div className="task-detail-title">
								<div className="detail-title-icon">
									<i className="far fa-file"></i>
								</div>
								<label
									htmlFor="file"
									onClick={() =>
										alert('檔案上傳功能開發中！')
									}
								>
									File
								</label>
							</div>
							<div className="task-detail-form">
								<input
									type="file"
									id="file"
									disabled
									onClick={() =>
										alert('檔案上傳功能開發中！')
									}
								/>
							</div>
						</div>
						<div className="task-detail-item">
							<div className="task-detail-title">
								<div className="detail-title-icon">
									<i className="far fa-comment-dots"></i>
								</div>
								<label htmlFor="textarea">Comment</label>
							</div>
							<div className="task-detail-form">
								<textarea
									type="text"
									id="textarea"
									placeholder="Type your memo here..."
									onChange={(e) =>
										this.props.onNewTaskChange(
											'comment',
											e.target.value
										)
									}
								/>
							</div>
						</div>
					</div>
					<div className="add-task-buttons">
						<button
							className="task-button-cancel"
							onClick={() => this.props.onAddTaskCancel()}
						>
							<i className="fas fa-times"></i>Cancel
						</button>
						<button
							className="task-button-add"
							onClick={() => {
								this.props.onAddNewTask();
								this.props.orderTasks();
							}}
						>
							<i className="fas fa-plus"></i>Add Task
						</button>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		newTaskDetail: state.newTaskDetail,
	};
};

export default connect(mapState, {
	onAddTaskCancel,
	onNewTaskChange,
	onAddNewTask,
	orderTasks,
})(AddTaskOpen);

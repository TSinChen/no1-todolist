import React, { Fragment } from 'react';
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
	orderTasks,
} from '../store/actionCreators';

import AddTask from './AddTask';
import AddTaskOpen from './AddTaskOpen';

class Tasks extends React.Component {
	componentDidMount() {
		this.props.orderTasks();
	}

	renderTitle(task) {
		return task.editing ? (
			<input
				className="task-title-input"
				value={this.props.editingTaskDetail.title}
				onChange={(e) =>
					this.props.editTaskDetail('title', e.target.value)
				}
			/>
		) : (
			<div className={`task-title${task.checked ? ' checked' : ''}`}>
				<p>{task.title}</p>
			</div>
		);
	}

	renderProps(task) {
		if ((task.deadlineDate || task.comment) && !task.editing)
			return (
				<div className="task-props">
					{task.deadlineDate && (
						<div
							className="task-props-date"
							title={
								task.deadlineTime
									? task.deadlineDate +
									  ' ' +
									  task.deadlineTime
									: task.deadlineDate
							}
						>
							<i className="far fa-calendar-alt"></i>
							<p>{task.deadlineDate}</p>
						</div>
					)}
					{task.comment && (
						<div
							className="task-props-comment"
							title={task.comment}
						>
							<i className="far fa-comment-dots"></i>
						</div>
					)}
				</div>
			);
	}

	renderDetail(index) {
		return (
			<Fragment>
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
								value={
									this.props.editingTaskDetail.deadlineDate
								}
								onChange={(e) =>
									this.props.editTaskDetail(
										'deadlineDate',
										e.target.value
									)
								}
							/>
							<input
								type="time"
								value={
									this.props.editingTaskDetail.deadlineTime
								}
								onChange={(e) =>
									this.props.editTaskDetail(
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
							<label htmlFor="file">File</label>
						</div>
						<div className="task-detail-form">
							<input type="file" id="file" />
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
								value={this.props.editingTaskDetail.comment}
								onChange={(e) =>
									this.props.editTaskDetail(
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
						onClick={() => this.props.closeEditTask(index)}
					>
						<i className="fas fa-times"></i>Cancel
					</button>
					<button
						className="task-button-add"
						onClick={() => {
							this.props.saveEditTask(index);
							this.props.orderTasks();
						}}
					>
						<i className="far fa-save"></i>Save
					</button>
				</div>
			</Fragment>
		);
	}

	renderCheckbox(task, index) {
		if (!task.editing) {
			return (
				<input
					className="task-checkbox"
					type="checkbox"
					checked={task.checked}
					onChange={(e) => {
						this.props.changeTaskCheck(e.target.checked, index);
						this.props.orderTasks();
					}}
				/>
			);
		} else {
			return (
				<input
					className="task-checkbox"
					type="checkbox"
					checked={task.checked}
					onChange={(e) => {
						this.props.editTaskDetail('check', e.target.checked);
						this.props.orderTasks();
					}}
				/>
			);
		}
	}

	renderStar(task, index) {
		if (!task.editing) {
			return (
				<i
					className={`fa-star ${task.star ? 'star fas' : 'far'}`}
					onClick={() => {
						this.props.setTaskStar(index);
						this.props.orderTasks();
					}}
				></i>
			);
		} else {
			return (
				<i
					className={`fa-star ${
						this.props.editingTaskDetail.star ? 'star fas' : 'far'
					}`}
					onClick={() => {
						this.props.editTaskDetail('star', !task.star);
						this.props.orderTasks();
					}}
				></i>
			);
		}
	}

	getTasks(tasks) {
		switch (this.props.currentPage) {
			case 'inProgress':
				return tasks.map((task, index) => {
					return (
						<div
							className={`${
								task.editing ? 'add-task-open' : 'task-item'
							}${task.star ? ' star' : ''}${
								task.checked ? ' hide' : ''
							}`}
							key={task.title}
						>
							<div
								className={
									task.editing
										? 'add-task-header'
										: 'task-header'
								}
							>
								{this.renderCheckbox(task, index)}
								{this.renderTitle(task)}
								{this.renderStar(task, index)}
								<i
									className={`fas fa-pen ${
										task.editing ? 'active' : ''
									}`}
									onClick={() =>
										this.props.openEditTask(index)
									}
								></i>
							</div>

							{this.renderProps(task)}
							{task.editing ? this.renderDetail(index) : null}
						</div>
					);
				});
			case 'completed':
				return tasks.map((task, index) => {
					return (
						<div
							className={`${
								task.editing ? 'add-task-open' : 'task-item'
							}${task.star ? ' star' : ''}${
								!task.checked ? ' hide' : ''
							}`}
							key={task.title}
						>
							<div
								className={
									task.editing
										? 'add-task-header'
										: 'task-header'
								}
							>
								{this.renderCheckbox(task, index)}
								{this.renderTitle(task)}
								{this.renderStar(task, index)}
								<i
									className={`fas fa-pen ${
										task.editing ? 'active' : ''
									}`}
									onClick={() =>
										this.props.openEditTask(index)
									}
								></i>
							</div>

							{this.renderProps(task)}
							{task.editing ? this.renderDetail(index) : null}
						</div>
					);
				});
			default:
				return tasks.map((task, index) => {
					return (
						<div
							className={`${
								task.editing ? 'add-task-open' : 'task-item'
							}${task.star ? ' star' : ''}`}
							key={task.title}
						>
							<div
								className={
									task.editing
										? 'add-task-header'
										: 'task-header'
								}
							>
								{this.renderCheckbox(task, index)}
								{this.renderTitle(task)}
								{this.renderStar(task, index)}
								<i
									className={`fas fa-pen ${
										task.editing ? 'active' : ''
									}`}
									onClick={() =>
										this.props.openEditTask(index)
									}
								></i>
							</div>

							{this.renderProps(task)}
							{task.editing ? this.renderDetail(index) : null}
						</div>
					);
				});
		}
	}

	render() {
		return (
			<Fragment>
				{this.props.isAddTaskOpen ? <AddTaskOpen /> : <AddTask />}
				<div className="tasks">{this.getTasks(this.props.tasks)}</div>
			</Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		currentPage: state.currentPage,
		isAddTaskOpen: state.isAddTaskOpen,
		tasks: state.tasks,
		editingTaskDetail: state.editingTaskDetail,
	};
};

export default connect(mapState, {
	onAddTaskCancel,
	onAddNewTask,
	setTaskStar,
	openEditTask,
	closeEditTask,
	editTaskDetail,
	saveEditTask,
	changeTaskCheck,
	orderTasks,
})(Tasks);

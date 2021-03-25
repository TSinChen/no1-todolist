import * as constants from './constants';

export const setCurrentPage = (page) => {
	return {
		type: constants.SET_CURRENT_PAGE,
		page,
	};
};

export const onAddTaskClick = () => {
	return {
		type: constants.ADD_TASK_CLICK,
	};
};

export const onAddTaskCancel = () => {
	return {
		type: constants.ADD_TASK_CANCEL,
	};
};

export const onNewTaskChange = (key, value) => {
	return {
		type: constants.NEW_TASK_CHANGE,
		key,
		value,
	};
};

export const onAddNewTask = () => {
	return {
		type: constants.ADD_NEW_TASK,
	};
};

export const setTaskStar = (index) => {
	return {
		type: constants.SET_TASK_STAR,
		index,
	};
};

export const openEditTask = (index) => {
	return {
		type: constants.OPEN_EDIT_TASK,
		index,
	};
};

export const closeEditTask = (index) => {
	return {
		type: constants.CLOSE_EDIT_TASK,
		index,
	};
};

export const editTaskDetail = (key, value) => {
	return {
		type: constants.EDIT_TASK_DETAIL,
		key,
		value,
	};
};

export const saveEditTask = (index) => {
	return {
		type: constants.SAVE_EDIT_TASK,
		index,
	};
};

export const changeTaskCheck = (check, index) => {
	return {
		type: constants.CHANGE_TASK_CHECK,
		check,
		index,
	};
};

export const orderTasks = () => {
	return {
		type: constants.ORDER_TASK,
	};
};

export const setTasks = (tasks)=>{
	return {
		type: constants.SET_TASKS,
		tasks
	}
}

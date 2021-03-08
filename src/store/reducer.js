import * as constants from './constants';

const defaultState = {
	currentPage: 'myTasks',
	isAddTaskOpen: false,
	newTaskDetail: {
		title: '',
		deadlineDate: '',
		deadlineTime: '',
		comment: '',
		star: false,
		checked: false,
	},
	tasks: [
		{
			title: 'Test 1',
			deadlineDate: '2021-03-20',
			deadlineTime: '00:00',
			comment: 'TEST',
			checked: false,
		},
		{
			title: 'Test 2',
			comment: 'TEST',
			checked: true,
		},
		{
			title: 'Test 3',
			checked: false,
		},
	],
	editingTaskDetail: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.page,
				tasks: state.tasks.map((task) => {
					return {
						...task,
						editing: false,
					};
				}),
			};
		case constants.ADD_TASK_CLICK:
			return {
				...state,
				isAddTaskOpen: true,
			};
		case constants.ADD_TASK_CANCEL:
			return {
				...state,
				isTypingTitle: false,
				isAddTaskOpen: false,
			};
		case constants.NEW_TASK_CHANGE:
			switch (action.key) {
				case 'title':
					return {
						...state,
						newTaskDetail: {
							...state.newTaskDetail,
							title: action.value,
						},
					};
				case 'deadlineDate':
					return {
						...state,
						newTaskDetail: {
							...state.newTaskDetail,
							deadlineDate: action.value,
						},
					};
				case 'deadlineTime':
					return {
						...state,
						newTaskDetail: {
							...state.newTaskDetail,
							deadlineTime: action.value,
						},
					};
				case 'comment':
					return {
						...state,
						newTaskDetail: {
							...state.newTaskDetail,
							comment: action.value,
						},
					};
				case 'star':
					return {
						...state,
						newTaskDetail: {
							...state.newTaskDetail,
							star: state.newTaskDetail.star ? false : true,
						},
					};
				default:
					return state;
			}
		case constants.ADD_NEW_TASK:
			return {
				...state,
				tasks: [...state.tasks, state.newTaskDetail],
				newTaskDetail: {
					title: '',
					deadlineDate: '',
					deadlineTime: '',
					comment: '',
					star: false,
					checked: false,
				},
				isTypingTitle: false,
				isAddTaskOpen: false,
			};
		case constants.SET_TASK_STAR:
			return {
				...state,
				tasks: state.tasks.map((task, index) => {
					if (index === action.index) {
						return {
							...task,
							star: !task.star,
						};
					}
					return task;
				}),
			};
		case constants.OPEN_EDIT_TASK:
			return {
				...state,
				tasks: state.tasks.map((task, index) => {
					if (index === action.index) {
						return {
							...task,
							editing: true,
						};
					} else {
						return {
							...task,
							editing: false,
						};
					}
				}),
				editingTaskDetail: state.tasks[action.index],
			};
		case constants.CLOSE_EDIT_TASK:
			return {
				...state,
				tasks: state.tasks.map((task, index) => {
					if (index === action.index) {
						return {
							...task,
							editing: false,
						};
					}
					return task;
				}),
				editingTaskDetail: {},
			};
		case constants.EDIT_TASK_DETAIL:
			switch (action.key) {
				case 'title':
					return {
						...state,
						editingTaskDetail: {
							...state.editingTaskDetail,
							title: action.value,
						},
					};
				case 'deadlineDate':
					return {
						...state,
						editingTaskDetail: {
							...state.editingTaskDetail,
							deadlineDate: action.value,
						},
					};
				case 'deadlineTime':
					return {
						...state,
						editingTaskDetail: {
							...state.editingTaskDetail,
							deadlineTime: action.value,
						},
					};
				case 'comment':
					return {
						...state,
						editingTaskDetail: {
							...state.editingTaskDetail,
							comment: action.value,
						},
					};
				case 'star':
					return {
						...state,
						editingTaskDetail: {
							...state.editingTaskDetail,
							star: action.value,
						},
					};
				case 'check':
					return {
						...state,
						editingTaskDetail: {
							...state.editingTaskDetail,
							checked: action.value,
						},
					};
				default:
					return state;
			}
		case constants.SAVE_EDIT_TASK:
			return {
				...state,
				tasks: state.tasks.map((task, index) => {
					if (index === action.index) {
						return {
							...state.editingTaskDetail,
							editing: false,
						};
					}
					return task;
				}),
				editingTaskDetail: {},
			};
		case constants.CHANGE_TASK_CHECK:
			return {
				...state,
				tasks: state.tasks.map((task, index) => {
					if (index === action.index) {
						return {
							...task,
							checked: action.check,
						};
					}
					return task;
				}),
			};
		case constants.ORDER_TASK:
			const orderOneTasks = state.tasks.filter((task) => {
				if (task.star && !task.checked) {
					return task;
				}
				return null;
			});

			const orderTwoTasks = state.tasks.filter((task) => {
				if (!task.star && !task.checked) {
					return task;
				}
				return null;
			});

			const orderThreeTasks = state.tasks.filter((task) => {
				if (task.star && task.checked) {
					return task;
				}
				return null;
			});

			const orderFourTasks = state.tasks.filter((task) => {
				if (!task.star && task.checked) {
					return task;
				}
				return null;
			});
			return {
				...state,
				tasks: [
					...orderOneTasks,
					...orderTwoTasks,
					...orderThreeTasks,
					...orderFourTasks,
				],
			};
		default:
			return state;
	}
};

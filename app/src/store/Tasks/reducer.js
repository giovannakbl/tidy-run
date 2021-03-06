import { TasksActionTypes } from "./types";

export const initialStateTasks = {
  data: {
    task: {
      id: undefined,
      name: undefined,
      task_icon: undefined,
      icon_color: undefined,
      difficulty: undefined,
      points_earned: null,
      completed_at: null,
      home_member_id: null,
      challenge_id: undefined,
    },
    tasksList: [],
  },
  error: undefined,
  loading: false,
  status: 'idle',
};

const tasksReducer = (state = initialStateTasks, action) => {
  switch (action.type) {
    case TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_REQUEST:
    case TasksActionTypes.COMPLETE_TASK_REQUEST:
    case TasksActionTypes.REMOVE_COMPLETION_TASK_REQUEST:
    case TasksActionTypes.FETCH_TASK_REQUEST:
    case TasksActionTypes.CREATE_TASK_REQUEST:
    case TasksActionTypes.DELETE_TASK_REQUEST:
    case TasksActionTypes.EDIT_TASK_REQUEST: {
      return { ...state, loading: true, status: 'loading', error: undefined };
    }
    case TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, tasksList: action.payload.tasks },
        status: 'succeeded', error: undefined
      };
    }
    case TasksActionTypes.COMPLETE_TASK_SUCCESS:
    case TasksActionTypes.REMOVE_COMPLETION_TASK_SUCCESS:
    case TasksActionTypes.FETCH_TASK_SUCCESS:
    case TasksActionTypes.CREATE_TASK_SUCCESS:
    case TasksActionTypes.EDIT_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, task: action.payload.task },
        status: 'succeeded', error: undefined
      };
    }
    case TasksActionTypes.DELETE_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, task: initialStateTasks.data.task },
        status: 'succeeded', error: undefined
      };
    }
    case TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_ERROR:
    case TasksActionTypes.COMPLETE_TASK_ERROR:
    case TasksActionTypes.REMOVE_COMPLETION_TASK_ERROR:
    case TasksActionTypes.FETCH_TASK_ERROR:
    case TasksActionTypes.CREATE_TASK_ERROR:
    case TasksActionTypes.DELETE_TASK_ERROR:
    case TasksActionTypes.EDIT_TASK_ERROR: {
      return { ...state, loading: false, status: 'rejected', error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { tasksReducer };

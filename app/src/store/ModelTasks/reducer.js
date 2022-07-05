import { ModelTasksActionTypes } from "./types";

export const initialStateModelTasks = {
  data: {
    modelTask: {
      id: undefined,
      name: undefined,
      task_icon: undefined,
      icon_color: undefined,
      difficulty: undefined,
    },
    modelTasksList: [],
  },
  error: undefined,
  loading: false,
};

const modelTasksReducer = (state = initialStateModelTasks, action) => {
  switch (action.type) {
    case ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_REQUEST:
    case ModelTasksActionTypes.FETCH_MODEL_TASK_REQUEST:
    case ModelTasksActionTypes.CREATE_MODEL_TASK_REQUEST:
    case ModelTasksActionTypes.DELETE_MODEL_TASK_REQUEST:
    case ModelTasksActionTypes.EDIT_MODEL_TASK_REQUEST: {
      return { ...state, loading: true, error: undefined };
    }
    case ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: undefined,
        data: { ...state.data, modelTasksList: action.payload.model_tasks },
      };
    }
    case ModelTasksActionTypes.FETCH_MODEL_TASK_SUCCESS:
    case ModelTasksActionTypes.CREATE_MODEL_TASK_SUCCESS:
    case ModelTasksActionTypes.EDIT_MODEL_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: undefined,
        data: { ...state.data, modelTask: action.payload.model_task },
      };
    }
    case ModelTasksActionTypes.DELETE_MODEL_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: undefined,
        data: {
          ...state.data,
          modelTask: initialStateModelTasks.data.modelTask,
        },
      };
    }
    case ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_ERROR:
    case ModelTasksActionTypes.FETCH_MODEL_TASK_ERROR:
    case ModelTasksActionTypes.CREATE_MODEL_TASK_ERROR:
    case ModelTasksActionTypes.DELETE_MODEL_TASK_ERROR:
    case ModelTasksActionTypes.EDIT_MODEL_TASK_ERROR: {
      return { ...state, loading: false, error: "We have an error here" };
    }
    default: {
      return state;
    }
  }
};

export { modelTasksReducer };

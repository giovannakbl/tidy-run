import { TasksActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import api from "../../services/api";

export const fetchTaskRequest = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: TasksActionTypes.FETCH_TASK_REQUEST });
    const tasksRes = await api.get(`/v1/tasks/${taskId}`);
    dispatch({
      type: TasksActionTypes.FETCH_TASK_SUCCESS,
      payload: tasksRes.data,
    });
    return tasksRes.data;
  } catch (err) {
    dispatch({
      type: TasksActionTypes.FETCH_TASK_ERROR,
      payload: err,
    });
    throw err;
  }
};

export const fetchTasksInChallengeRequest =
  (challengeId) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_REQUEST });
      const tasksRes = await api.get(`/v1/tasks/challenge_tasks/${challengeId}`);
      dispatch({
        type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_SUCCESS,
        payload: tasksRes.data,
      });
      return tasksRes.data;
    } catch (err) {
      dispatch({
        type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const editTaskRequest =
  (taskId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.EDIT_TASK_REQUEST });
      const tasksRes = await api.put(`/v1/tasks/${taskId}`, formValues);
      dispatch({
        type: TasksActionTypes.EDIT_TASK_SUCCESS,
        payload: tasksRes.data,
      });
      return tasksRes.data;
    } catch (err) {
      dispatch({
        type: TasksActionTypes.EDIT_TASK_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const deleteTaskRequest = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: TasksActionTypes.DELETE_TASK_REQUEST });
    const tasksRes = await api.delete(`/v1/tasks/${taskId}`);
    dispatch({
      type: TasksActionTypes.DELETE_TASK_SUCCESS,
      payload: tasksRes.data,
    });
    return tasksRes.data;
  } catch (err) {
    dispatch({
      type: TasksActionTypes.DELETE_TASK_ERROR,
      payload: err,
    });
    throw err;
  }
};


export const createTaskRequest =
  (formValues, challengeId) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.CREATE_TASK_REQUEST });
      const tasksRes = await api.post(`/v1/tasks/${challengeId}`, formValues);
      dispatch({
        type: TasksActionTypes.CREATE_TASK_SUCCESS,
        payload: tasksRes.data,
      });
      return tasksRes.data;
    } catch (err) {
      dispatch({ type: TasksActionTypes.CREATE_TASK_ERROR,
        payload: err, });
      throw err;
    }
  };

export const completeTaskRequest =
  (taskId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.COMPLETE_TASK_REQUEST });
      const tasksRes = await api.put(`/v1/tasks/complete/${taskId}`, formValues);
      dispatch({
        type: TasksActionTypes.COMPLETE_TASK_SUCCESS,
        payload: tasksRes.data,
      });
      return tasksRes.data;
    } catch (err) {
      dispatch({
        type: TasksActionTypes.COMPLETE_TASK_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const removeCompletionTaskRequest =
  (taskId) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.REMOVE_COMPLETION_TASK_REQUEST });
      const tasksRes = await api.put(`/v1/tasks/remove_completion/${taskId}`);
      dispatch({
        type: TasksActionTypes.REMOVE_COMPLETION_TASK_SUCCESS,
        payload: tasksRes.data,
      });
      return tasksRes.data;
    } catch (err) {
      dispatch({
        type: TasksActionTypes.REMOVE_COMPLETION_TASK_ERROR,
        payload: err,
      });
      throw err;
    }
  };

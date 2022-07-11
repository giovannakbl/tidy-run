import { ModelTasksActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import { applyMiddleware } from "@reduxjs/toolkit";
import api from "../../services/api";

export const allModelTasksRequest = () => async (dispatch) => {
  try {
    dispatch({ type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_REQUEST });
    const modelTasksRes = await api.get(`/v1/model_tasks`);
    dispatch({
      type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_SUCCESS,
      payload: modelTasksRes.data,
    });
    return modelTasksRes.data;
  } catch (err) {
    dispatch({
      type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_ERROR,
      payload: err.data,
    });
    throw err;
  }
};

export const fetchModelTaskRequest =
  (modelTaskId) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.FETCH_MODEL_TASK_REQUEST });
      const modelTasksRes = await api.get(`/v1/model_tasks/${modelTaskId}`);
      dispatch({
        type: ModelTasksActionTypes.FETCH_MODEL_TASK_SUCCESS,
        payload: modelTasksRes.data,
      });
      return modelTasksRes.data;
    } catch (err) {
      dispatch({
        type: ModelTasksActionTypes.FETCH_MODEL_TASK_ERROR,
        payload: err.data,
      });
      throw err;
    }
  };

export const editModelTaskRequest =
  ( modelTaskId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.EDIT_MODEL_TASK_REQUEST });
      const modelTasksRes = await api.put(`/v1/model_tasks/${modelTaskId}`, formValues);
      dispatch({
        type: ModelTasksActionTypes.EDIT_MODEL_TASK_SUCCESS,
        payload: modelTasksRes.data,
      });
      return modelTasksRes.data;
    } catch (err) {
      dispatch({
        type: ModelTasksActionTypes.EDIT_MODEL_TASK_ERROR,
        payload: err.data,
      });
      throw err;
    }
  };

export const deleteModelTaskRequest =
  (modelTaskId) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.DELETE_MODEL_TASK_REQUEST });
      const modelTasksRes = await api.delete(`/v1/model_tasks/${modelTaskId}`);
      dispatch({
        type: ModelTasksActionTypes.DELETE_MODEL_TASK_SUCCESS,
        payload: modelTasksRes.data,
      });
      return modelTasksRes.data;
    } catch (err) {
      dispatch({
        type: ModelTasksActionTypes.DELETE_MODEL_TASK_ERROR,
        payload: err.data,
      });
      throw err;
    }
  };

export const createModelTaskRequest =
  (formValues) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.CREATE_MODEL_TASK_REQUEST });
      const modelTasksRes = await api.post(`/v1/model_tasks`, formValues);
      dispatch({
        type: ModelTasksActionTypes.CREATE_MODEL_TASK_SUCCESS,
        payload: modelTasksRes.data,
      });
      return modelTasksRes.data;
    } catch (err) {
      dispatch({ type: ModelTasksActionTypes.CREATE_MODEL_TASK_ERROR,
        payload: err.data, });
      throw err;
    }
  };

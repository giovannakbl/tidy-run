import { ModelTasksActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";


export const allModelTasksRequest = (token) => async (dispatch) => {
  try {
    dispatch({ type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_REQUEST });
    const asyncResp = await getAllModelTasksApi(token);
    dispatch({
      type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_ERROR,
      payload: e,
    });
    throw e;
  }
};

async function getAllModelTasksApi(token) {
  const res = await fetch(baseURL + "/api/v1/model_tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

export const fetchModelTaskRequest =
  (token, modelTaskId) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.FETCH_MODEL_TASK_REQUEST });
      const asyncResp = await fetchModelTaskApi(token, modelTaskId);
      dispatch({
        type: ModelTasksActionTypes.FETCH_MODEL_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: ModelTasksActionTypes.FETCH_MODEL_TASK_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function fetchModelTaskApi(token, modelTaskId) {
  const res = await fetch(baseURL + "/api/v1/model_tasks/" + modelTaskId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

export const editModelTaskRequest =
  (token, modelTaskId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.EDIT_MODEL_TASK_REQUEST });
      const asyncResp = await editModelTaskApi(token, modelTaskId, formValues);
      dispatch({
        type: ModelTasksActionTypes.EDIT_MODEL_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: ModelTasksActionTypes.EDIT_MODEL_TASK_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function editModelTaskApi(token, modelTaskId, formValues) {
  const res = await fetch(baseURL + "/api/v1/model_tasks/" + modelTaskId, {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

export const deleteModelTaskRequest =
  (token, modelTaskId) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.DELETE_MODEL_TASK_REQUEST });
      const asyncResp = await deleteModelTaskApi(token, modelTaskId);
      dispatch({
        type: ModelTasksActionTypes.DELETE_MODEL_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: ModelTasksActionTypes.DELETE_MODEL_TASK_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function deleteModelTaskApi(token, modelTaskId) {
  const res = await fetch(baseURL + "/api/v1/model_tasks/" + modelTaskId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

export const createModelTaskRequest =
  (token, formValues) => async (dispatch) => {
    try {
      dispatch({ type: ModelTasksActionTypes.CREATE_MODEL_TASK_REQUEST });
      const asyncResp = await createModelTaskApi(token, formValues);
      dispatch({
        type: ModelTasksActionTypes.CREATE_MODEL_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({ type: ModelTasksActionTypes.CREATE_MODEL_TASK_ERROR,
        payload: e, });
      throw e;
    }
  };

async function createModelTaskApi(token, formValues) {
  const res = await fetch(baseURL + "/api/v1/model_tasks", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return await res.json();
}

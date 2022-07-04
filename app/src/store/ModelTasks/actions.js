import { ModelTasksActionTypes } from "./types";
import { baseURL } from "..";

export const allModelTasksRequest =
  (token) =>
  async dispatch => {
    try {
      dispatch({type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_REQUEST})
      const asyncResp = await getAllModelTasksApi(token);
      return dispatch({
        type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ModelTasksActionTypes.FETCH_ALL_MODEL_TASKS_ERROR
      })
    }
  }

async function getAllModelTasksApi(token) {
  const res = await fetch(baseURL + "/api/v1/model_tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()

}

export const fetchModelTaskRequest =
  (token, modelTaskId) =>
  async dispatch => {
    try {
      dispatch({type: ModelTasksActionTypes.FETCH_MODEL_TASK_REQUEST})
      const asyncResp = await fetchModelTaskApi(token, modelTaskId)
      return dispatch({
        type: ModelTasksActionTypes.FETCH_MODEL_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ModelTasksActionTypes.FETCH_MODEL_TASK_ERROR
      })
    }
  }

async function fetchModelTaskApi(token, modelTaskId) {
  const res = await fetch(baseURL + "/api/v1/model_tasks/" + modelTaskId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}


export const editModelTaskRequest =
  (token, modelTaskId, formValues) =>
  async dispatch => {
    try {
      dispatch({type: ModelTasksActionTypes.EDIT_MODEL_TASK_REQUEST})
      const asyncResp = await editModelTaskApi(token, modelTaskId, formValues)
      return dispatch({
        type: ModelTasksActionTypes.EDIT_MODEL_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ModelTasksActionTypes.EDIT_MODEL_TASK_ERROR
      })
    }
  }

async function editModelTaskApi(token, modelTaskId, formValues) {
  const res = await fetch(baseURL + "/api/v1/model_tasks/" + modelTaskId, {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const deleteModelTaskRequest =
  (token, modelTaskId) =>
  async dispatch => {
    try {
      dispatch({type: ModelTasksActionTypes.DELETE_MODEL_TASK_REQUEST})
      const asyncResp = await deleteModelTaskApi(token, modelTaskId);
      console.log(modelTaskId + "deleted");
      return dispatch({
        type: ModelTasksActionTypes.DELETE_MODEL_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ModelTasksActionTypes.DELETE_MODEL_TASK_ERROR
      })
    }
  }

async function deleteModelTaskApi(token, modelTaskId) {
  const res = await fetch(baseURL + "/api/v1/model_tasks/" + modelTaskId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const createModelTaskRequest =
  (token, formValues) =>
  async dispatch => {
    try {
      dispatch({type: ModelTasksActionTypes.CREATE_MODEL_TASK_REQUEST})
      const asyncResp = await createModelTaskApi(token, formValues);
      console.log("Criado");
      dispatch({
        type: ModelTasksActionTypes.CREATE_MODEL_TASK_SUCCESS,
        payload: asyncResp
      });
      return asyncResp;
    } catch (e) {
      console.log("Nao conseguiu criar");
      dispatch({type: ModelTasksActionTypes.CREATE_MODEL_TASK_ERROR});
      throw e;
    }
  }

async function createModelTaskApi(token, formValues) {
  const res = await fetch(baseURL + "/api/v1/model_tasks", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  console.log(res);
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return await res.json()
}
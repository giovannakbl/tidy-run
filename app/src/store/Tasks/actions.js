import { TasksActionTypes } from "./types";
import { baseURL } from "..";

export const fetchTaskRequest =
  (token, taskId) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.FETCH_TASK_REQUEST})
      const asyncResp = await fetchTaskApi(token, taskId)
      return dispatch({
        type: TasksActionTypes.FETCH_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TasksActionTypes.FETCH_TASK_ERROR
      })
    }
  }

async function fetchTaskApi(token, taskId) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + taskId, {
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

export const fetchTasksInChallengeRequest =
  (token, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_REQUEST})
      const asyncResp = await fetchTasksInChallengeApi(token, challengeId)
      return dispatch({
        type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_ERROR
      })
    }
  }

async function fetchTasksInChallengeApi(token, challengeId) {
  const res = await fetch(baseURL + "/api/v1/tasks/challenge_tasks/" + challengeId, {
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

export const editTaskRequest =
  (token, taskId, formValues) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.EDIT_TASK_REQUEST})
      const asyncResp = await editTaskApi(token, taskId, formValues)
      return dispatch({
        type: TasksActionTypes.EDIT_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TasksActionTypes.EDIT_TASK_ERROR
      })
    }
  }

async function editTaskApi(token, taskId, formValues) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + taskId, {
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

export const deleteTaskRequest =
  (token, taskId) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.DELETE_TASK_REQUEST})
      const asyncResp = await deleteTaskApi(token, taskId);
      console.log(taskId + "deleted");
      return dispatch({
        type: TasksActionTypes.DELETE_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TasksActionTypes.DELETE_TASK_ERROR
      })
    }
  }

async function deleteTaskApi(token, taskId) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + taskId, {
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

export const createTaskRequest =
  (token, formValues, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.CREATE_TASK_REQUEST})
      const asyncResp = await createTaskApi(token, formValues, challengeId);
      console.log("Criado");
      dispatch({
        type: TasksActionTypes.CREATE_TASK_SUCCESS,
        payload: asyncResp
      });
      return asyncResp;
    } catch (e) {
      console.log("Nao conseguiu criar");
      dispatch({type: TasksActionTypes.CREATE_TASK_ERROR});
      throw e;
    }
  }

async function createTaskApi(token, formValues, challengeId) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + challengeId, {
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

export const completeTaskRequest =
  (token, taskId, formValues) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.COMPLETE_TASK_REQUEST})
      const asyncResp = await completeTaskApi(token, taskId, formValues)
      dispatch({
        type: TasksActionTypes.COMPLETE_TASK_SUCCESS,
        payload: asyncResp
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: TasksActionTypes.COMPLETE_TASK_ERROR
      });
      throw e;
    }
  }

async function completeTaskApi(token, taskId, formValues) {
  const res = await fetch(baseURL + "/api/v1/tasks/complete/" + taskId, {
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

export const removeCompletionTaskRequest =
  (token, taskId) =>
  async dispatch => {
    try {
      dispatch({type: TasksActionTypes.REMOVE_COMPLETION_TASK_REQUEST})
      const asyncResp = await removeCompletionTaskApi(token, taskId)
      return dispatch({
        type: TasksActionTypes.REMOVE_COMPLETION_TASK_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TasksActionTypes.REMOVE_COMPLETION_TASK_ERROR
      })
    }
  }

async function removeCompletionTaskApi(token, taskId) {
  const res = await fetch(baseURL + "/api/v1/tasks/remove_completion/" + taskId, {
    method: "PUT",
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
import { TasksActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";

export const fetchTaskRequest = (token, taskId) => async (dispatch) => {
  try {
    dispatch({ type: TasksActionTypes.FETCH_TASK_REQUEST });
    const asyncResp = await fetchTaskApi(token, taskId);
    dispatch({
      type: TasksActionTypes.FETCH_TASK_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: TasksActionTypes.FETCH_TASK_ERROR,
      payload: e,
    });
    throw e;
  }
};

async function fetchTaskApi(token, taskId) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + taskId, {
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

export const fetchTasksInChallengeRequest =
  (token, challengeId) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_REQUEST });
      const asyncResp = await fetchTasksInChallengeApi(token, challengeId);
      dispatch({
        type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: TasksActionTypes.FETCH_TASKS_IN_CHALLENGE_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function fetchTasksInChallengeApi(token, challengeId) {
  const res = await fetch(
    baseURL + "/api/v1/tasks/challenge_tasks/" + challengeId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

export const editTaskRequest =
  (token, taskId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.EDIT_TASK_REQUEST });
      const asyncResp = await editTaskApi(token, taskId, formValues);
      dispatch({
        type: TasksActionTypes.EDIT_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: TasksActionTypes.EDIT_TASK_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function editTaskApi(token, taskId, formValues) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + taskId, {
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

export const deleteTaskRequest = (token, taskId) => async (dispatch) => {
  try {
    dispatch({ type: TasksActionTypes.DELETE_TASK_REQUEST });
    const asyncResp = await deleteTaskApi(token, taskId);
    dispatch({
      type: TasksActionTypes.DELETE_TASK_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: TasksActionTypes.DELETE_TASK_ERROR,
      payload: e,
    });
    throw e;
  }
};

async function deleteTaskApi(token, taskId) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + taskId, {
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

export const createTaskRequest =
  (token, formValues, challengeId) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.CREATE_TASK_REQUEST });
      const asyncResp = await createTaskApi(token, formValues, challengeId);
      dispatch({
        type: TasksActionTypes.CREATE_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({ type: TasksActionTypes.CREATE_TASK_ERROR,
        payload: e, });
      throw e;
    }
  };

async function createTaskApi(token, formValues, challengeId) {
  const res = await fetch(baseURL + "/api/v1/tasks/" + challengeId, {
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

export const completeTaskRequest =
  (token, taskId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.COMPLETE_TASK_REQUEST });
      const asyncResp = await completeTaskApi(token, taskId, formValues);
      dispatch({
        type: TasksActionTypes.COMPLETE_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: TasksActionTypes.COMPLETE_TASK_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function completeTaskApi(token, taskId, formValues) {
  const res = await fetch(baseURL + "/api/v1/tasks/complete/" + taskId, {
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

export const removeCompletionTaskRequest =
  (token, taskId) => async (dispatch) => {
    try {
      dispatch({ type: TasksActionTypes.REMOVE_COMPLETION_TASK_REQUEST });
      const asyncResp = await removeCompletionTaskApi(token, taskId);
      dispatch({
        type: TasksActionTypes.REMOVE_COMPLETION_TASK_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: TasksActionTypes.REMOVE_COMPLETION_TASK_ERROR,
        payload: e,
      });
      throw e;
    }
  };

async function removeCompletionTaskApi(token, taskId) {
  const res = await fetch(
    baseURL + "/api/v1/tasks/remove_completion/" + taskId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

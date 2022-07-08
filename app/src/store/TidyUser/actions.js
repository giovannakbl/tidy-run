import { TidyUserActionTypes } from "./types";
import { baseURL } from "..";

export const tidyUserRequest = (token) => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.FETCH_TIDY_USER_REQUEST });
    const asyncResp = await getTidyUserApi(token);
    dispatch({
      type: TidyUserActionTypes.FETCH_TIDY_USER_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: TidyUserActionTypes.FETCH_TIDY_USER_ERROR,
    });
    throw e;
  }
};

async function getTidyUserApi(token) {
  const res = await fetch(baseURL + "/api/v1/tidy_user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw errorInfo;
  }
  return res.json();
}

export const tidyUserEdit = (token, formValues) => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.EDIT_TIDY_USER_REQUEST });
    const asyncResp = await editTidyUserApi(token, formValues);
    dispatch({
      type: TidyUserActionTypes.EDIT_TIDY_USER_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: TidyUserActionTypes.EDIT_TIDY_USER_ERROR,
    });
    throw e;
  }
};

async function editTidyUserApi(token, formValues) {
  const res = await fetch(baseURL + "/api/v1/tidy_user", {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw errorInfo;
  }
  return res.json();
}

export const createTidyUserRequest = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.CREATE_TIDY_USER_REQUEST });
    const asyncResp = await createTidyUserApi(formValues);
    dispatch({
      type: TidyUserActionTypes.CREATE_TIDY_USER_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: TidyUserActionTypes.CREATE_TIDY_USER_ERROR,
      payload: e,
    });
    throw e;
  }
};

async function createTidyUserApi(formValues) {
  const res = await fetch(baseURL + "/api/v1/tidy_user/register", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    switch (errorInfo.status_code) {
      case 603:
        errorInfo.error_message = "This email is already registered in our website"
        break;
      default:
        errorInfo.error_message = "Something went wrong"
        break;
    }
    throw errorInfo;
  }
  return res.json();
}

export const deleteTidyUserRequest = (token) => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.DELETE_TIDY_USER_REQUEST });
    const asyncResp = await deleteTidyUserApi(token);
    dispatch({
      type: TidyUserActionTypes.DELETE_TIDY_USER_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: TidyUserActionTypes.DELETE_TIDY_USER_ERROR,
    });
    throw e;
  }
};

async function deleteTidyUserApi(token) {
  const res = await fetch(baseURL + "/api/v1/tidy_user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw errorInfo;
  }
  return res.json();
}

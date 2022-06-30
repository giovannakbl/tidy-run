import { TidyUserActionTypes } from "./types";
import { baseURL } from "..";

export const tidyUserRequest =
  (token) =>
  async dispatch => {
    try {
      dispatch({type: TidyUserActionTypes.FETCH_TIDY_USER_REQUEST})
      const asyncResp = await getTidyUserApi(token)
      return dispatch({
        type: TidyUserActionTypes.FETCH_TIDY_USER_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TidyUserActionTypes.FETCH_TIDY_USER_ERROR
      })
    }
  }

async function getTidyUserApi(token) {
  const res = await fetch(baseURL + "/api/v1/tidy_user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  return res.json()
}

export const tidyUserEdit =
  (token, formValues) =>
  async dispatch => {
    try {
      dispatch({type: TidyUserActionTypes.EDIT_TIDY_USER_REQUEST})
      const asyncResp = await editTidyUserApi(token, formValues)
      return dispatch({
        type: TidyUserActionTypes.EDIT_TIDY_USER_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: TidyUserActionTypes.EDIT_TIDY_USER_ERROR
      })
    }
  }

async function editTidyUserApi(token, formValues) {
  const res = await fetch(baseURL + "/api/v1/tidy_user", {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  return res.json()
}
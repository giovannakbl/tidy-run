import { AuthActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";

export const loginRequest = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
    const asyncResp = await exampleAPI(formValues);
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: asyncResp,
    });
    return asyncResp;
  } catch (e) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAILURE,
      payload: e,
    });
    throw e;
  }
};

async function exampleAPI(formValues) {
  const res = await fetch(baseURL + "/api/login_check", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

export const logoutRequest = () => (dispatch) => {
  dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
};

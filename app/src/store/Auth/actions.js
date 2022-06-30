import { AuthActionTypes } from "./types";
import { baseURL } from "..";

export const loginRequest =
  (formValues) =>
  async dispatch => {
    try {
      dispatch({type: AuthActionTypes.LOGIN_REQUEST})
      const asyncResp = await exampleAPI(formValues)
      return dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: AuthActionTypes.LOGIN_FAILURE
      })
    }
  };

async function exampleAPI(formValues) {
  const res = await fetch(baseURL + "/api/login_check", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return res.json()
};

export const logoutRequest =
  () => dispatch =>
   {
      dispatch({type: AuthActionTypes.LOGOUT_SUCCESS})
  };

  
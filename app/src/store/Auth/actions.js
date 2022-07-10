import { AuthActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import api  from "../../services/api"

export const loginRequest = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
    // try {
    // await api.post("/token/invalidate", undefined, {withCredentials: true})
    // } finally {
    const res = await api.post("/login_check", formValues, {withCredentials: true})
    
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    return res.data;
  // }
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAILURE,
      payload: err,
    });
    throw err;
  }
};

// export const refreshToken = () => async (dispatch) => {
//   try {
//     dispatch({ type: AuthActionTypes.REFRESH_REQUEST });
//     console.log("before refresh")
//     const res = await api.post("/token/refresh", undefined, {withCredentials: true})
//     console.log("after refresh")
//     console.log(res.data);
//     dispatch({
//       type: AuthActionTypes.REFRESH_SUCCESS,
//       payload: {}
//       // res.data,
//     });
//     console.log("refreshed success")
//     return res.data;
//   } catch (err) {
//     console.log(err)
//     console.log("refresh failure")
//     dispatch({
//       type: AuthActionTypes.REFRESH_FAILURE,
//       payload: err,
//     });
//     throw err;
//   }
// };


export const refreshToken = () => async (dispatch) => {
    try {
      dispatch({ type: AuthActionTypes.REFRESH_REQUEST });
      const res = await api.post("/token/refresh", undefined, {withCredentials: true})
      dispatch({
        type: AuthActionTypes.REFRESH_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (e) {
      dispatch({
        type: AuthActionTypes.REFRESH_FAILURE,
        payload: e,
      });
      throw e;
     }

  };


// export const logoutRequest = () => (dispatch) => {
//   dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
// };
export const logoutRequest = () => async  (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGOUT_REQUEST });
    const res = await api.delete("/token/invalidate", {withCredentials: true})
    dispatch({
      type: AuthActionTypes.LOGOUT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (e) {
    dispatch({
      type: AuthActionTypes.LOGOUT_FAILURE,
      payload: e,
    });
    throw e;
   }
};

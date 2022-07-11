import { AuthActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import api  from "../../services/api";
import Cookies from 'js-cookie';



export const loginRequest = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
    const res = await api.post("/login_check", formValues, {withCredentials: true})
    
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAILURE,
      payload: err.data,
    });
    throw err;
  }
};


export const refreshToken = () => async (dispatch) => {
  
    try {
      dispatch({ type: AuthActionTypes.REFRESH_REQUEST });
      const res = await api.post("/token/refresh", undefined, {withCredentials: true})
      dispatch({
        type: AuthActionTypes.REFRESH_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      Cookies.set('isLoggedIn', 'no', { path: "/" })
      window.location.reload();
      dispatch({
        type: AuthActionTypes.REFRESH_FAILURE,
        payload: err.data,
      });
      throw err;
     }

  };


export const logoutRequest = () => async  (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGOUT_REQUEST });
    const res = await api.delete("/token/invalidate", {withCredentials: true})
    dispatch({
      type: AuthActionTypes.LOGOUT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGOUT_FAILURE,
      payload: err.data,
    });
    throw err;
   }
};

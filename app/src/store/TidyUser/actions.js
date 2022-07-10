import { TidyUserActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import api from "../../services/api";

export const tidyUserRequest = () => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.FETCH_TIDY_USER_REQUEST });
    const tidyUserRes = await api.get(`/v1/tidy_user`);
    dispatch({
      type: TidyUserActionTypes.FETCH_TIDY_USER_SUCCESS,
      payload: tidyUserRes.data,
    });
    return tidyUserRes.data;
  } catch (err) {
    dispatch({
      type: TidyUserActionTypes.FETCH_TIDY_USER_ERROR,
      payload: err,
    });
    throw err;
  }
};

export const tidyUserEdit = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.EDIT_TIDY_USER_REQUEST });
    const tidyUserRes = await api.put(`/v1/tidy_user`, formValues);
    dispatch({
      type: TidyUserActionTypes.EDIT_TIDY_USER_SUCCESS,
      payload: tidyUserRes.data,
    });
    return tidyUserRes.data;
  } catch (err) {
    dispatch({
      type: TidyUserActionTypes.EDIT_TIDY_USER_ERROR,
      payload: err,
    });
    throw err;
  }
};

export const createTidyUserRequest = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.CREATE_TIDY_USER_REQUEST });
    const tidyUserRes = await api.post(`/v1/tidy_user/register`, formValues);
    dispatch({
      type: TidyUserActionTypes.CREATE_TIDY_USER_SUCCESS,
      payload: tidyUserRes.data,
    });
    return tidyUserRes.data;
  } catch (err) {
    dispatch({
      type: TidyUserActionTypes.CREATE_TIDY_USER_ERROR,
      payload: err,
    });
    throw err;
  }
};


export const deleteTidyUserRequest = () => async (dispatch) => {
  try {
    dispatch({ type: TidyUserActionTypes.DELETE_TIDY_USER_REQUEST });
    const tidyUserRes = await api.delete(`/v1/tidy_user`);
    dispatch({
      type: TidyUserActionTypes.DELETE_TIDY_USER_SUCCESS,
      payload: tidyUserRes.data,
    });
    return tidyUserRes.data;
  } catch (err) {
    dispatch({
      type: TidyUserActionTypes.DELETE_TIDY_USER_ERROR,
      payload: err,
    });
    throw err;
  }
};

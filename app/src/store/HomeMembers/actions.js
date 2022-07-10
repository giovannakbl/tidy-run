import { HomeMembersActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import { applyMiddleware } from "@reduxjs/toolkit";
import api from "../../services/api";

export const allHomeMembersRequest = () => async (dispatch) => {
  try {
    dispatch({ type: HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_REQUEST });
    const homeMembersRes = await api.get(`/v1/home_members`);
    dispatch({
      type: HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_SUCCESS,
      payload: homeMembersRes.data,
    });
    return homeMembersRes.data;
  } catch (err) {
    dispatch({
      type: HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_ERROR,
      payload: err,
    });
    throw err;
  }
};


export const fetchHomeMemberRequest =
  (homeMemberId) => async (dispatch) => {
    try {
      dispatch({ type: HomeMembersActionTypes.FETCH_HOME_MEMBER_REQUEST });
      const homeMembersRes = await api.get(`/v1/home_members/${homeMemberId}`);
      dispatch({
        type: HomeMembersActionTypes.FETCH_HOME_MEMBER_SUCCESS,
        payload: homeMembersRes.data,
      });
      return homeMembersRes.data;
    } catch (err) {
      dispatch({
        type: HomeMembersActionTypes.FETCH_HOME_MEMBER_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const editHomeMemberRequest =
  (homeMemberId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: HomeMembersActionTypes.EDIT_HOME_MEMBER_REQUEST });
      const homeMembersRes = await api.put(
        `/v1/home_members/${homeMemberId}`, formValues
      );
      dispatch({
        type: HomeMembersActionTypes.EDIT_HOME_MEMBER_SUCCESS,
        payload: homeMembersRes.data,
      });
      return homeMembersRes.data;
    } catch (err) {
      dispatch({
        type: HomeMembersActionTypes.EDIT_HOME_MEMBER_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const deleteHomeMemberRequest =
  (homeMemberId) => async (dispatch) => {
    try {
      dispatch({ type: HomeMembersActionTypes.DELETE_HOME_MEMBER_REQUEST });
      const homeMembersRes = await api.delete(`/v1/home_members/${homeMemberId}`);
      dispatch({
        type: HomeMembersActionTypes.DELETE_HOME_MEMBER_SUCCESS,
        payload: homeMembersRes.data,
      });
      return homeMembersRes.data;
    } catch (err) {
      dispatch({
        type: HomeMembersActionTypes.DELETE_HOME_MEMBER_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const createHomeMemberRequest =
  (formValues) => async (dispatch) => {
    try {
      dispatch({ type: HomeMembersActionTypes.CREATE_HOME_MEMBER_REQUEST });
      const homeMembersRes = await api.post(`/v1/home_members`, formValues);
      dispatch({
        type: HomeMembersActionTypes.CREATE_HOME_MEMBER_SUCCESS,
        payload: homeMembersRes.data,
      });
      return homeMembersRes.data;
    } catch (err) {
      dispatch({ type: HomeMembersActionTypes.CREATE_HOME_MEMBER_ERROR,
        payload: err, });
      throw err;
    }
  };


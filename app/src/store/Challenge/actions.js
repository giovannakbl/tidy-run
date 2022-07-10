import { ChallengeActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import api from "../../services/api";

export const allChallengesRequest = () => async (dispatch) => {
  try {
    dispatch({ type: ChallengeActionTypes.FETCH_ALL_CHALLENGES_REQUEST });
    const challengesRes = await api.get('/v1/challenges')
    dispatch({
      type: ChallengeActionTypes.FETCH_ALL_CHALLENGES_SUCCESS,
      payload: challengesRes.data,
    });
    return challengesRes.data;
  } catch (err) {
    dispatch({
      type: ChallengeActionTypes.FETCH_ALL_CHALLENGES_ERROR,
      payload: err,
    });
    throw err;
  }
};

export const fetchChallengeRequest =
  (challengeId) => async (dispatch) => {
    try {
      dispatch({ type: ChallengeActionTypes.FETCH_CHALLENGE_REQUEST });
      const challengesRes = await api.get(`/v1/challenges/${challengeId}`);
      dispatch({
        type: ChallengeActionTypes.FETCH_CHALLENGE_SUCCESS,
        payload: challengesRes.data,
      });
      return challengesRes.data;
    } catch (err) {
      dispatch({
        type: ChallengeActionTypes.FETCH_CHALLENGE_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const editChallengeRequest =
  (challengeId, formValues) => async (dispatch) => {
    try {
      dispatch({ type: ChallengeActionTypes.EDIT_CHALLENGE_REQUEST });
      const challengesRes = await api.put(`/v1/challenges/${challengeId}`, formValues);
      dispatch({
        type: ChallengeActionTypes.EDIT_CHALLENGE_SUCCESS,
        payload: challengesRes.data,
      });
      return challengesRes.data;
    } catch (err) {
      dispatch({
        type: ChallengeActionTypes.EDIT_CHALLENGE_ERROR,
        payload: err,
      });
      throw err;
    }
  };

export const deleteChallengeRequest =
  (challengeId) => async (dispatch) => {
    try {
      dispatch({ type: ChallengeActionTypes.DELETE_CHALLENGE_REQUEST });
      const challengesRes = await api.delete(`/v1/challenges/${challengeId}`);
      dispatch({
        type: ChallengeActionTypes.DELETE_CHALLENGE_SUCCESS,
        payload: challengesRes.data,
      });
      return challengesRes.data;
    } catch (err) {
      dispatch({
        type: ChallengeActionTypes.DELETE_CHALLENGE_ERROR,
        payload: err,
      });
      throw err;
    }
  };


export const createChallengeRequest =
  (formValues) => async (dispatch) => {
    try {
      dispatch({ type: ChallengeActionTypes.CREATE_CHALLENGE_REQUEST });
      const challengesRes = await api.post(`/v1/challenges`, formValues);
      dispatch({
        type: ChallengeActionTypes.CREATE_CHALLENGE_SUCCESS,
        payload: challengesRes.data,
      });
      return challengesRes.data;
    } catch (err) {
      dispatch({ type: ChallengeActionTypes.CREATE_CHALLENGE_ERROR,
        payload: err, });
      throw err;
    }
  };

export const terminateChallengeRequest =
  (challengeId) => async (dispatch) => {
    try {
      dispatch({ type: ChallengeActionTypes.TERMINATE_CHALLENGE_REQUEST });
      const challengesRes = await api.put( `/v1/challenges/terminate/${challengeId}`);
      dispatch({
        type: ChallengeActionTypes.TERMINATE_CHALLENGE_SUCCESS,
        payload: challengesRes.data,
      });
      return challengesRes.data;
    } catch (err) {
      dispatch({
        type: ChallengeActionTypes.TERMINATE_CHALLENGE_ERROR,
        payload: err,
      });
      throw err;
    }
  };


export const reopenChallengeRequest =
  (challengeId) => async (dispatch) => {
    try {
      dispatch({ type: ChallengeActionTypes.REOPEN_CHALLENGE_REQUEST });
      const challengesRes = await api.put( `/v1/challenges/reopen/${challengeId}`);
      dispatch({
        type: ChallengeActionTypes.REOPEN_CHALLENGE_SUCCESS,
        payload: challengesRes.data,
      });
      return challengesRes.data;
    } catch (err) {
      dispatch({
        type: ChallengeActionTypes.REOPEN_CHALLENGE_ERROR,
        payload: err,
      });
      throw err;
    }
  };


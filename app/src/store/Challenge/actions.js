import { ChallengeActionTypes } from "./types";
import { baseURL } from "..";
import { loginRequest } from "../Auth/actions";

export const allChallengesRequest =
  (token) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.FETCH_ALL_CHALLENGES_REQUEST})
      const asyncResp = await getAllChallengesApi(token);
      console.log("List fetched");
      return dispatch({
        type: ChallengeActionTypes.FETCH_ALL_CHALLENGES_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeActionTypes.FETCH_ALL_CHALLENGES_ERROR
      })
    }
  }

async function getAllChallengesApi(token) {
  const res = await fetch(baseURL + "/api/v1/challenges", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()

}

export const fetchChallengeRequest =
  (token, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.FETCH_CHALLENGE_REQUEST});
      const asyncResp = await fetchChallengeApi(token, challengeId);
      dispatch({
        type: ChallengeActionTypes.FETCH_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
      return asyncResp;
    } catch (e) {
      dispatch({
        type: ChallengeActionTypes.FETCH_CHALLENGE_ERROR
      })
      throw e;
    }
  }

async function fetchChallengeApi(token, challengeId) {
  const res = await fetch(baseURL + "/api/v1/challenges/" + challengeId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const editChallengeRequest =
  (token, challengeId, formValues) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.EDIT_CHALLENGE_REQUEST})
      const asyncResp = await editChallengeApi(token, challengeId, formValues)
      return dispatch({
        type: ChallengeActionTypes.EDIT_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeActionTypes.EDIT_CHALLENGE_ERROR
      })
    }
  }

async function editChallengeApi(token, challengeId, formValues) {
  const res = await fetch(baseURL + "/api/v1/challenges/" + challengeId, {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const deleteChallengeRequest =
  (token, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.DELETE_CHALLENGE_REQUEST})
      const asyncResp = await deleteChallengeApi(token, challengeId);
      console.log(challengeId + "deleted");
      return dispatch({
        type: ChallengeActionTypes.DELETE_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeActionTypes.DELETE_CHALLENGE_ERROR
      })
    }
  }

async function deleteChallengeApi(token, challengeId) {
  const res = await fetch(baseURL + "/api/v1/challenges/" + challengeId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const createChallengeRequest =
  (token, formValues) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.CREATE_CHALLENGE_REQUEST})
      const asyncResp = await createChallengeApi(token, formValues);
      console.log("Criado");
      dispatch({
        type: ChallengeActionTypes.CREATE_CHALLENGE_SUCCESS,
        payload: asyncResp
      });
      return asyncResp;
    } catch (e) {
      console.log("Nao conseguiu criar");
      dispatch({type: ChallengeActionTypes.CREATE_CHALLENGE_ERROR});
      throw e;
    }
  }

async function createChallengeApi(token, formValues) {
  const res = await fetch(baseURL + "/api/v1/challenges", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  console.log(res);
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return await res.json()
}

export const terminateChallengeRequest =
  (token, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.TERMINATE_CHALLENGE_REQUEST})
      const asyncResp = await terminateChallengeApi(token, challengeId)
      return dispatch({
        type: ChallengeActionTypes.TERMINATE_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeActionTypes.TERMINATE_CHALLENGE_ERROR
      })
    }
  }

async function terminateChallengeApi(token, challengeId) {
  const res = await fetch(baseURL + "/api/v1/challenges/terminate/" + challengeId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const reopenChallengeRequest =
  (token, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.REOPEN_CHALLENGE_REQUEST})
      const asyncResp = await reopenChallengeApi(token, challengeId)
      return dispatch({
        type: ChallengeActionTypes.REOPEN_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeActionTypes.REOPEN_CHALLENGE_ERROR
      })
    }
  }

async function reopenChallengeApi(token, challengeId) {
  const res = await fetch(baseURL + "/api/v1/challenges/reopen/" + challengeId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}
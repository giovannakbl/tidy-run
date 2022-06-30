import { ChallengeActionTypes } from "./types";
import { baseURL } from "..";

export const fetchChallengeRequest =
  (token, challengeId) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeActionTypes.FETCH_CHALLENGE_REQUEST})
      const asyncResp = await fetchChallengeApi(token, challengeId)
      return dispatch({
        type: ChallengeActionTypes.FETCH_CHALLENGE_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeActionTypes.FETCH_CHALLENGE_ERROR
      })
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
  console.log(res);
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
  console.log(res);
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()

}


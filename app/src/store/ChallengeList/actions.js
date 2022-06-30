import { ChallengeListActionTypes } from "./types";
import { baseURL } from "..";

export const allChallengesRequest =
  (token) =>
  async dispatch => {
    try {
      dispatch({type: ChallengeListActionTypes.FETCH_ALL_CHALLENGES_REQUEST})
      const asyncResp = await getAllChallengesApi(token);
      console.log("List fetched");
      return dispatch({
        type: ChallengeListActionTypes.FETCH_ALL_CHALLENGES_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: ChallengeListActionTypes.FETCH_ALL_CHALLENGES_ERROR
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

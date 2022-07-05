import { ScoreBoardsActionTypes } from "./types";
import { baseURL } from "..";

export const fetchScoreBoardsRequest =
  (token, challengeId) => async (dispatch) => {
    try {
      dispatch({
        type: ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_REQUEST,
      });
      const asyncResp = await fetchScoreBoardsApi(token, challengeId);
      dispatch({
        type: ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_SUCCESS,
        payload: asyncResp,
      });
      return asyncResp;
    } catch (e) {
      dispatch({
        type: ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_ERROR,
      });
      throw e;
    }
  };

async function fetchScoreBoardsApi(token, challengeId) {
  const res = await fetch(
    baseURL + "/api/v1/challenge_score_boards/" + challengeId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json();
}
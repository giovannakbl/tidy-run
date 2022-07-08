import { ScoreBoardsActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";


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
        payload: e,
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
    const errorInfo = await res.json();
    errorInfo.error_message_api = getErrorMessageApi(errorInfo);
    throw errorInfo;
  }
  return res.json();
}

import { ScoreBoardsActionTypes } from "./types";
import { baseURL } from "..";
import { getErrorMessageApi } from "..";
import api from "../../services/api";

export const fetchScoreBoardsRequest =
  (challengeId) => async (dispatch) => {
    try {
      dispatch({
        type: ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_REQUEST,
      });
      const scoreBoardsRes = await api.get(`/v1/challenge_score_boards/${challengeId}`);
      dispatch({
        type: ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_SUCCESS,
        payload: scoreBoardsRes.data,
      });
      return scoreBoardsRes.data;
    } catch (err) {
      dispatch({
        type: ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_ERROR,
        payload: err.data,
      });
      throw err;
    }
  };
  
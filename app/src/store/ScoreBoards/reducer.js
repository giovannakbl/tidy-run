import { ScoreBoardsActionTypes } from "./types";

export const initialStateScoreBoards = {
  data: {
    scoreBoards: [],
  },
  error: undefined,
  loading: false,
};

const scoreBoardsReducer = (state = initialStateScoreBoards, action) => {
  switch (action.type) {
    case ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_REQUEST: {
      return { ...state, loading: true, error: undefined };
    }
    case ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: undefined,
        data: { scoreBoards: action.payload.challenge_score_boards },
      };
    }
    case ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_ERROR: {
      return { ...state, loading: false, error: "We have an error here" };
    }
    default: {
      return state;
    }
  }
};

export { scoreBoardsReducer };

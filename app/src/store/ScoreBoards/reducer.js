import { ScoreBoardsActionTypes } from "./types";

export const initialStateScoreBoards = {
  data: {
    scoreBoards: [],
  },
  error: undefined,
  loading: false,
  status: 'idle',
};

const scoreBoardsReducer = (state = initialStateScoreBoards, action) => {
  switch (action.type) {
    case ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_REQUEST: {
      return { ...state, loading: true, status: 'loading', error: undefined };
    }
    case ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { scoreBoards: action.payload.challenge_score_boards },
        status: 'succeeded', error: undefined 
      };
    }
    case ScoreBoardsActionTypes.FETCH_SCORE_BOARDS_OF_CHALLENGE_ERROR: {
      return { ...state, loading: false, status: 'rejected', error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { scoreBoardsReducer };

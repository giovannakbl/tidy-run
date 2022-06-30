import { ChallengeActionTypes } from "./types";

export const initialStateChallenge = {
    data:  {
            id: undefined,
            created_at: undefined,
            name: undefined,
            status: undefined,
            start_date: undefined,
            end_date: undefined,
            prize: undefined
        }
    ,   
    error: undefined,
    loading: false
};

const challengeReducer = (state = initialStateChallenge, action) => {
    switch (action.type) {
        case ChallengeActionTypes.DELETE_CHALLENGE_REQUEST:
        case ChallengeActionTypes.EDIT_CHALLENGE_REQUEST:
        case ChallengeActionTypes.FETCH_CHALLENGE_REQUEST: {
          return { ...state, loading: true };
        }
        
        case ChallengeActionTypes.EDIT_CHALLENGE_SUCCESS:
        case ChallengeActionTypes.FETCH_CHALLENGE_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: action.payload.challenge };
        }
        case ChallengeActionTypes.DELETE_CHALLENGE_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: initialStateChallenge.data };
        }
        case ChallengeActionTypes.DELETE_CHALLENGE_ERROR:
        case ChallengeActionTypes.EDIT_CHALLENGE_ERROR:
        case ChallengeActionTypes.FETCH_CHALLENGE_ERROR: {
          return { ...state, loading: false, error: "Error" };
        }
        default: {
          return state;
        }
      }
}

export { challengeReducer };
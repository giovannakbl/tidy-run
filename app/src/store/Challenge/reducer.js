import { ChallengeActionTypes } from "./types";

export const initialStateChallenge = {
    data: { 
      challenge: {
            id: undefined,
            created_at: undefined,
            name: undefined,
            status: undefined,
            start_date: undefined,
            end_date: undefined,
            prize: undefined
        },
      challengeList: [],
    },   
    error: undefined,
    loading: false
};

const challengeReducer = (state = initialStateChallenge, action) => {
  console.log(action)
    switch (action.type) {
        case ChallengeActionTypes.FETCH_ALL_CHALLENGES_REQUEST:
        case ChallengeActionTypes.DELETE_CHALLENGE_REQUEST:
        case ChallengeActionTypes.EDIT_CHALLENGE_REQUEST:
        case ChallengeActionTypes.FETCH_CHALLENGE_REQUEST:
        case ChallengeActionTypes.CREATE_CHALLENGE_REQUEST:
        case ChallengeActionTypes.TERMINATE_CHALLENGE_REQUEST:   
        case ChallengeActionTypes.REOPEN_CHALLENGE_REQUEST: {
          return { ...state, loading: true, error: undefined };
        }
        case ChallengeActionTypes.FETCH_ALL_CHALLENGES_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: {...state.data, challengeList: action.payload.challenges }};
        }
        case ChallengeActionTypes.EDIT_CHALLENGE_SUCCESS:
        case ChallengeActionTypes.FETCH_CHALLENGE_SUCCESS:
        case ChallengeActionTypes.CREATE_CHALLENGE_SUCCESS:
        case ChallengeActionTypes.TERMINATE_CHALLENGE_SUCCESS:
        case ChallengeActionTypes.REOPEN_CHALLENGE_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: {...state.data, challenge: action.payload.challenge }};
        }
        case ChallengeActionTypes.DELETE_CHALLENGE_SUCCESS: {
          return { ...state, loading: false, error: undefined, data: {...state.data, challenge: initialStateChallenge.data.challenge }};
        }
        case ChallengeActionTypes.FETCH_ALL_CHALLENGES_ERROR:
        case ChallengeActionTypes.DELETE_CHALLENGE_ERROR:
        case ChallengeActionTypes.EDIT_CHALLENGE_ERROR:
        case ChallengeActionTypes.FETCH_CHALLENGE_ERROR:
        case ChallengeActionTypes.CREATE_CHALLENGE_ERROR: 
        case ChallengeActionTypes.TERMINATE_CHALLENGE_ERROR:
        case ChallengeActionTypes.REOPEN_CHALLENGE_ERROR: {
          return { ...state, loading: false, error: "We have an error here",  data: [] };
        }
        default: {
          return state;
        }
      }
}

export { challengeReducer };
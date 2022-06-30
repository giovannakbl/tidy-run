import { Reducer } from "react";
import { ChallengeListActionTypes } from "./types";
import { AnyAction as Action } from "redux";

export const initialStateChallengeList = {
    data: []
    ,   
    error: undefined,
    loading: false
};

const challengeListReducer = (state = initialStateChallengeList, action) => {
    switch (action.type) {

        case ChallengeListActionTypes.FETCH_ALL_CHALLENGES_REQUEST: {
          return { ...state, loading: true };
        }
        case ChallengeListActionTypes.FETCH_ALL_CHALLENGES_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: action.payload.challenges };
        }
        
        case ChallengeListActionTypes.FETCH_ALL_CHALLENGES_ERROR: {
          return { ...state, loading: false, data: [], error: "Error" };
        }
        default: {
          return state;
        }
      }
}

export { challengeListReducer };
import { TidyUserActionTypes, tidyUserState } from "./types";

export const initialState = {
  data: {
    id: null,
    email: null,
    home_name: null,
  },
  errors: undefined,
  loading: false,
  status: 'idle',
};

const tidyUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case TidyUserActionTypes.EDIT_TIDY_USER_REQUEST:
    case TidyUserActionTypes.FETCH_TIDY_USER_REQUEST:
    case TidyUserActionTypes.DELETE_TIDY_USER_REQUEST:
    case TidyUserActionTypes.CREATE_TIDY_USER_REQUEST: {
      return { ...state, errors: undefined, loading: true, status: 'loading' };
    }
    case TidyUserActionTypes.EDIT_TIDY_USER_SUCCESS:
    case TidyUserActionTypes.FETCH_TIDY_USER_SUCCESS:
    case TidyUserActionTypes.DELETE_TIDY_USER_SUCCESS:
    case TidyUserActionTypes.CREATE_TIDY_USER_SUCCESS: {
      return { ...state, loading: false, data: action.payload.tidy_user, status: 'succeeded' };
    }
    case TidyUserActionTypes.EDIT_TIDY_USER_ERROR:
    case TidyUserActionTypes.FETCH_TIDY_USER_ERROR:
    case TidyUserActionTypes.EDIT_TIDY_USER_ERROR:
    case TidyUserActionTypes.FETCH_TIDY_USER_ERROR:
    case TidyUserActionTypes.CREATE_TIDY_USER_ERROR: {
      return { ...state, loading: false, errors: action.payload, status: 'rejected' };
    }
    default: {
      return state;
    }
  }
};

export { tidyUserReducer };

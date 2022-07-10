import { AuthActionTypes } from "./types";

export const initialState = {
  data: {
    token: null,
  },
  error: undefined,
  loading: false,
  status: 'idle',
  authenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGOUT_REQUEST:
    case AuthActionTypes.REFRESH_REQUEST:
    case AuthActionTypes.LOGIN_REQUEST: {
      return { ...state, loading: true, status: 'loading', error: undefined  };
    }
    case AuthActionTypes.REFRESH_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS: {
      return { ...state, authenticated: true, loading: false, data: action.payload, status: 'succeeded', error: undefined };
    }
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REFRESH_FAILURE:
    case AuthActionTypes.LOGOUT_FAILURE: {
      return { ...state, authenticated: false, loading: false, status: 'rejected', error: action.payload };
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return {
        data: {
          token: null,
          refresh_token: null,
        },
        loading: false,
        status: 'succeeded', error: undefined,
        authenticated: false
      };
    }
    default: {
      return state;
    }
  }
};

export { authReducer };

import { AuthActionTypes } from "./types";


export const initialState = {
    data: {
        token: null,
        refresh_token: null
    },
    errors: undefined,
    loading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST: {
          return { ...state, loading: true };
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
          return { ...state, loading: false,  data: action.payload };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
          return { ...state, loading: false, errors: action.payload };
        }
        case AuthActionTypes.LOGOUT_REQUEST: {
          return { ...state, loading: true };
        }
        case AuthActionTypes.LOGOUT_SUCCESS: {
          return {
            data: {
            token: null,
            refresh_token: null
            },
          errors: undefined,
          loading: false
          };
        }
        case AuthActionTypes.LOGOUT_FAILURE: {
          return { ...state, loading: false, errors: action.payload };
        }
        default: {
          return state;
        }
      }
}

export { authReducer };
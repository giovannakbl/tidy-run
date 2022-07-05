import { HomeMembersActionTypes } from "./types";

export const initialStateHomeMembers = {
    data: { 
      homeMember: {
            id: undefined,
            name: undefined,
            avatar_icon: undefined,
            icon_color: undefined,
            deleted_at: undefined,
        },
      homeMembersList: [],
    },   
    error: undefined,
    loading: false
};

const homeMembersReducer = (state = initialStateHomeMembers, action) => {
    switch (action.type) {
        case HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_REQUEST:
        case HomeMembersActionTypes.FETCH_HOME_MEMBER_REQUEST:
        case HomeMembersActionTypes.CREATE_HOME_MEMBER_REQUEST:
        case HomeMembersActionTypes.DELETE_HOME_MEMBER_REQUEST:
        case HomeMembersActionTypes.EDIT_HOME_MEMBER_REQUEST: {
          return { ...state, loading: true, error: undefined };
        }
        case HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: {...state.data, homeMembersList: action.payload.home_members }};
        }
        case HomeMembersActionTypes.FETCH_HOME_MEMBER_SUCCESS:
        case HomeMembersActionTypes.CREATE_HOME_MEMBER_SUCCESS:
        case HomeMembersActionTypes.EDIT_HOME_MEMBER_SUCCESS: {
          return { ...state, loading: false, error: undefined,  data: {...state.data, homeMember: action.payload.home_member }};
        }
        case HomeMembersActionTypes.DELETE_HOME_MEMBER_SUCCESS: {
          return { ...state, loading: false, error: undefined, data: {...state.data, homeMember: initialStateHomeMembers.data.homeMember }};
        }
        case HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_ERROR:
        case HomeMembersActionTypes.FETCH_HOME_MEMBER_ERROR:
        case HomeMembersActionTypes.CREATE_HOME_MEMBER_ERROR:
        case HomeMembersActionTypes.DELETE_HOME_MEMBER_ERROR:
        case HomeMembersActionTypes.EDIT_HOME_MEMBER_ERROR: {
          return { ...state, loading: false, error: "We have an error here" };
        }
        default: {
          return state;
        }
      }
}

export { homeMembersReducer };
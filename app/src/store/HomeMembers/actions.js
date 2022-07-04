import { HomeMembersActionTypes } from "./types";
import { baseURL } from "..";

export const allHomeMembersRequest =
  (token) =>
  async dispatch => {
    try {
      dispatch({type: HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_REQUEST})
      const asyncResp = await getAllHomeMembersApi(token);
      return dispatch({
        type: HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: HomeMembersActionTypes.FETCH_ALL_HOME_MEMBERS_ERROR
      })
    }
  }

async function getAllHomeMembersApi(token) {
  const res = await fetch(baseURL + "/api/v1/home_members", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()

}

export const fetchHomeMemberRequest =
  (token, homeMemberId) =>
  async dispatch => {
    try {
      dispatch({type: HomeMembersActionTypes.FETCH_HOME_MEMBER_REQUEST})
      const asyncResp = await fetchHomeMemberApi(token, homeMemberId)
      return dispatch({
        type: HomeMembersActionTypes.FETCH_HOME_MEMBER_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: HomeMembersActionTypes.FETCH_HOME_MEMBER_ERROR
      })
    }
  }

async function fetchHomeMemberApi(token, homeMemberId) {
  const res = await fetch(baseURL + "/api/v1/home_members/" + homeMemberId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}


export const editHomeMemberRequest =
  (token, homeMemberId, formValues) =>
  async dispatch => {
    try {
      dispatch({type: HomeMembersActionTypes.EDIT_HOME_MEMBER_REQUEST})
      const asyncResp = await editHomeMemberApi(token, homeMemberId, formValues)
      return dispatch({
        type: HomeMembersActionTypes.EDIT_HOME_MEMBER_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: HomeMembersActionTypes.EDIT_HOME_MEMBER_ERROR
      })
    }
  }

async function editHomeMemberApi(token, homeMemberId, formValues) {
  const res = await fetch(baseURL + "/api/v1/home_members/" + homeMemberId, {
    method: "PUT",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const deleteHomeMemberRequest =
  (token, homeMemberId) =>
  async dispatch => {
    try {
      dispatch({type: HomeMembersActionTypes.DELETE_HOME_MEMBER_REQUEST})
      const asyncResp = await deleteHomeMemberApi(token, homeMemberId);
      console.log(homeMemberId + "deleted");
      return dispatch({
        type: HomeMembersActionTypes.DELETE_HOME_MEMBER_SUCCESS,
        payload: asyncResp
      })
    } catch (e) {
      return dispatch({
        type: HomeMembersActionTypes.DELETE_HOME_MEMBER_ERROR
      })
    }
  }

async function deleteHomeMemberApi(token, homeMemberId) {
  const res = await fetch(baseURL + "/api/v1/home_members/" + homeMemberId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return res.json()
}

export const createHomeMemberRequest =
  (token, formValues) =>
  async dispatch => {
    try {
      dispatch({type: HomeMembersActionTypes.CREATE_HOME_MEMBER_REQUEST})
      const asyncResp = await createHomeMemberApi(token, formValues);
      console.log("Criado");
      dispatch({
        type: HomeMembersActionTypes.CREATE_HOME_MEMBER_SUCCESS,
        payload: asyncResp
      });
      return asyncResp;
    } catch (e) {
      console.log("Nao conseguiu criar");
      dispatch({type: HomeMembersActionTypes.CREATE_HOME_MEMBER_ERROR});
      throw e;
    }
  }

async function createHomeMemberApi(token, formValues) {
  const res = await fetch(baseURL + "/api/v1/home_members", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  console.log(res);
  if(!res.ok) {
    throw new Error("Failed HTTTP");
  }
  return await res.json()
}
import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAILURE,
  UPLOAD_IMAGE,
  CHANGE_VIEW_MODE,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_MESSAGE,
} from "./userProfileActionTypes";

// Actions
const logout = () => {
  return {
    type: LOGOUT,
  };
};

const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};

const login = (url, data) => {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "post",
        data,
      },
    },
  };
};

const changeViewMode = (viewMode) => {
  return {
    type: CHANGE_VIEW_MODE,
    payload: viewMode,
  };
};

const uploadImage = (imageFile) => {
  return { type: UPLOAD_IMAGE, payload: imageFile };
};

const getUserProfile = (url, token) => {
  return {
    types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  };
};

const editUserProfile = (url, data, token) => {
  console.log(data);
  const formData = getFormData(data);
  return {
    types: [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    },
  };
};

const deleteProfile = (url, token) => {
  return {
    types: [
      DELETE_PROFILE_REQUEST,
      DELETE_PROFILE_SUCCESS,
      DELETE_PROFILE_FAILURE,
    ],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  };
};

function getFormData(object) {
  let formData = new FormData();
  for (var key in object) {
    console.log(key, object[key]);
    formData.append(key, object[key]);
  }
  return formData;
}

export default {
  login,
  logout,
  editUserProfile,
  getUserProfile,
  uploadImage,
  changeViewMode,
  deleteProfile,
  clearMessage,
};

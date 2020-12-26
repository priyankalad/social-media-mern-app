import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAILURE,
  UPLOAD_IMAGE,
  CHANGE_VIEW_MODE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE,
  CLEAR_MESSAGE,
} from "./userProfileActionTypes";

const initialState = {
  loading: false,
  successMessage: "",
  errorMessage: "",
  updatedImageFile: null,
  updatedImageFileURL: "",
  user: {},
  viewMode: "view",
  token: "",
  isLoggedIn: false,
};

const userProfileReducer = (state = initialState, action) => {
  let { type, payload, error } = action;
  switch (type) {
    case LOGIN_REQUEST:
    case EDIT_REQUEST:
    case GET_PROFILE_REQUEST:
    case DELETE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      let { user, token } = payload.data;
      return {
        ...state,
        loading: false,
        user: user,
        isLoggedIn: true,
        token: token,
        errorMessage: "",
      };
    case LOGIN_FAILURE:
      let errorMessage = "";
      console.log(typeof error.data);
      if (error.data && typeof error.data === "string")
        errorMessage = error.data;
      else errorMessage = error.response.data.message;
      console.log(errorMessage);

      return {
        ...state,
        loading: false,
        user: {},
        isLoggedIn: false,
        errorMessage: errorMessage,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        token: "",
        user: {},
        isLoggedIn: false,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        token: "",
        user: {},
        isLoggedIn: false,
        successMessage: payload.data.message,
      };
    case CHANGE_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
        updatedImageFile: null,
        updatedImageFileURL: "",
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        updatedImageFile: null,
        updatedImageFileURL: "",
        viewMode: "view",
        user: payload.data.user,
      };
    case EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        successMessage: "",
        errorMessage: error.response.data.message,
        viewMode: "edit",
        updatedImageFile: null,
        updatedImageFileURL: "",
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: "",
        errorMessage: "",
        user: payload.data.user,
        imageFilePath: payload.data.user.profilePicPath,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        successMessage: "",
        user: {},
        errorMessage: error.data,
      };
    case UPLOAD_IMAGE:
      let imageUrl = URL.createObjectURL(payload);
      return {
        ...state,
        updatedImageFile: payload,
        updatedImageFileURL: imageUrl,
      };
    case DELETE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: error.response.data.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        successMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default userProfileReducer;

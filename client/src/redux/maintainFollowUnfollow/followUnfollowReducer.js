import {
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAILURE,
  GET_UNFOLLOWING_REQUEST,
  GET_UNFOLLOWING_SUCCESS,
  GET_UNFOLLOWING_FAILURE,
  GET_N_UNFOLLOWING_REQUEST,
  GET_N_UNFOLLOWING_SUCCESS,
  GET_N_UNFOLLOWING_FAILURE,
  MY_FOLLOWERS_REQUEST,
  MY_FOLLOWERS_SUCCESS,
  MY_FOLLOWERS_FAILURE,
  CLEAR_SHOW_FOLLOW_BUTTON
} from "./followUnfollowAction";

const initial_state = {
  loading: false,
  followingUsers: [],
  unfollowingUsers: [],
  followers: [],
  errorMessage: "",
  followId: "",
  unfollowId: "",
  showFollowButton: false,
  followButtonLoading: false,
  unfollowButtonLoading: false,
  centralLoading: false,
  sideLoading: false
};

const followUnfollowReducer = (state = initial_state, action) => {
  let { type, payload, error } = action;

  switch (type) {
    case CLEAR_SHOW_FOLLOW_BUTTON:
      return {
        ...state,
        showFollowButton: false
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        followButtonLoading: true,
        followId: payload.request.data.followId
      };
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        unfollowButtonLoading: true,
        unfollowId: payload.request.data.unfollowId
      };
    case GET_FOLLOWING_REQUEST:
    case GET_UNFOLLOWING_REQUEST:
    case MY_FOLLOWERS_REQUEST:
      return {
        ...state,
        centralLoading: true
      };
    case GET_N_UNFOLLOWING_REQUEST:
      return {
        ...state,
        sideLoading: true
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        unfollowButtonLoading: false,
        errorMessage: "",
        unfollowingUsers: [
          ...state.unfollowingUsers,
          state.followingUsers.find(u => u._id === state.unfollowId)
        ],
        followingUsers: payload.data.followingUsers,
        showFollowButton: true
      };
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        unfollowButtonLoading: false,
        errorMessage: error.data
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followButtonLoading: false,
        errorMessage: "",
        followingUsers: payload.data.followingUsers,
        unfollowingUsers: state.unfollowingUsers.filter(
          u => u._id !== state.followId
        ),
        showFollowButton: false
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        followButtonLoading: false,
        errorMessage: error.data,
        followingIds: [],
        followId: ""
      };
    case GET_UNFOLLOWING_SUCCESS:
      return {
        ...state,
        centralLoading: false,
        unfollowingUsers: payload.data.unfollowingUsers,
        errorMessage: ""
      };
    case GET_UNFOLLOWING_FAILURE:
      return {
        ...state,
        centralLoading: false,
        unfollowingUsers: [],
        errorMessage: error.data
      };
    case GET_N_UNFOLLOWING_SUCCESS:
      return {
        ...state,
        sideLoading: false,
        unfollowingUsers: payload.data.unfollowingUsers,
        errorMessage: ""
      };
    case GET_N_UNFOLLOWING_FAILURE:
      return {
        ...state,
        sideLoading: false,
        unfollowingUsers: [],
        errorMessage: error.data
      };
    case GET_FOLLOWING_SUCCESS:
      return {
        ...state,
        centralLoading: false,
        followingUsers: payload.data.followingUsers,
        errorMessage: ""
      };
    case GET_FOLLOWING_FAILURE:
      return {
        ...state,
        centralLoading: false,
        followingIds: [],
        errorMessage: error.data
      };
    case MY_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followers: payload.data.users,
        centralLoading: false,
        errorMessage: ""
      };
    }
    case MY_FOLLOWERS_FAILURE:
      return {
        ...state,
        centralLoading: false,
        followers: [],
        errorMessage: error.data
      };
    default:
      return state;
  }
};

export default followUnfollowReducer;

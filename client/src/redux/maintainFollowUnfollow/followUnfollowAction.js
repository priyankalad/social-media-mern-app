export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";
export const GET_FOLLOWING_REQUEST = "GET_FOLLOWING_REQUEST";
export const GET_FOLLOWING_SUCCESS = "GET_FOLLOWING_SUCCESS";
export const GET_FOLLOWING_FAILURE = "GET_FOLLOWING_FAILURE";
export const GET_UNFOLLOWING_REQUEST = "GET_UNFOLLOWING_REQUEST";
export const GET_UNFOLLOWING_SUCCESS = "GET_UNFOLLOWING_SUCCESS";
export const GET_UNFOLLOWING_FAILURE = "GET_UNFOLLOWING_FAILURE";
export const GET_N_UNFOLLOWING_REQUEST = "GET_N_UNFOLLOWING_REQUEST";
export const GET_N_UNFOLLOWING_SUCCESS = "GET_N_UNFOLLOWING_SUCCESS";
export const GET_N_UNFOLLOWING_FAILURE = "GET_N_UNFOLLOWING_FAILURE";
export const MY_FOLLOWERS_REQUEST = "MY_FOLLOWERS_REQUEST";
export const MY_FOLLOWERS_SUCCESS = "MY_FOLLOWERS_SUCCESS";
export const MY_FOLLOWERS_FAILURE = "MY_FOLLOWERS_FAILURE";
export const CLEAR_SHOW_FOLLOW_BUTTON = "CLEAR_SHOW_FOLLOW_BUTTON";

const clearShowFollowButton = () => {
  return {
    type: CLEAR_SHOW_FOLLOW_BUTTON
  };
};

const getMyFollowers = (url, token) => {
  return {
    types: [MY_FOLLOWERS_REQUEST, MY_FOLLOWERS_SUCCESS, MY_FOLLOWERS_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

const followUser = (url, followId, token) => {
  return {
    types: [FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        data: { followId: followId },
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      // options: {
      //   onSuccess({ getState, dispatch, response }) {
      //     let unfollowingUsers = getState().followUnfollow.unfollowingUsers;
      //     if (unfollowingUsers.length <= 4) {
      //       dispatch({type: })
      //     }
      //   }
      // }
    }
  };
};

const unfollowUser = (url, unfollowId, token) => {
  return {
    types: [UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        data: { unfollowId: unfollowId },
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

const getFollowingUsers = (url, token) => {
  return {
    types: [
      GET_FOLLOWING_REQUEST,
      GET_FOLLOWING_SUCCESS,
      GET_FOLLOWING_FAILURE
    ],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

const getNUnfollowingUsers = (url, token) => {
  return {
    types: [
      GET_N_UNFOLLOWING_REQUEST,
      GET_N_UNFOLLOWING_SUCCESS,
      GET_N_UNFOLLOWING_FAILURE
    ],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};
const getUnfollowingUsers = (url, token) => {
  return {
    types: [
      GET_UNFOLLOWING_REQUEST,
      GET_UNFOLLOWING_SUCCESS,
      GET_UNFOLLOWING_FAILURE
    ],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

export default {
  followUser,
  unfollowUser,
  getFollowingUsers,
  getUnfollowingUsers,
  getNUnfollowingUsers,
  getMyFollowers,
  clearShowFollowButton
};

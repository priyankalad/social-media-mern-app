export const REQUEST = "GET_OTHER_PROFILE_REQUEST";
export const SUCCESS = "GET_OTHER_PROFILE_SUCCESS";
export const FAILURE = "GET_OTHER_PROFILE_FAILURE";

const getOtherUserProfile = (url, token) => {
  return {
    types: [REQUEST, SUCCESS, FAILURE],
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
  getOtherUserProfile
};

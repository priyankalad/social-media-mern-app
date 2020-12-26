export const REQUEST = "FORGOT_PASS_REQUEST";
export const SUCCESS = "FORGOT_PASS_SUCCESS";
export const FAILURE = "FORGOT_PASS_FAILURE";
export const CLEAR_USERNAME = "CLEAR_USERNAME";

const clearUsername = () => {
  return {
    type: CLEAR_USERNAME,
  };
};

const forgotPassword = (url, data) => {
  return {
    types: [REQUEST, SUCCESS, FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "put",
        data,
      },
    },
  };
};
export default {
  forgotPassword,
  clearUsername,
};

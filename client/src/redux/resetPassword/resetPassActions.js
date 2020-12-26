export const REQUEST = "RESET_PASS_REQUEST";
export const SUCCESS = "RESET_PASS_SUCCESS";
export const FAILURE = "RESET_PASS_FAILURE";

const resetPassword = (url, data) => {
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
  resetPassword,
};

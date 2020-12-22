export const REQUEST = "REGISTER_REQUEST";
export const SUCCESS = "REGISTER_SUCCESS";
export const FAILURE = "REGISTER_FAILURE";

const registerUser = (url, data) => {
  return {
    types: [REQUEST, SUCCESS, FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "post",
        data
      }
    }
  };
};

export default {
  registerUser
};

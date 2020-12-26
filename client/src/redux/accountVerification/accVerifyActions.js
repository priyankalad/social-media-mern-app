export const REQUEST = "VERIFY_REQUEST";
export const SUCCESS = "VERIFY_SUCCESS";
export const FAILURE = "VERIFY_FAILURE";

const verifyAccount = url => {
  return {
    types: [REQUEST, SUCCESS, FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get"
      }
    }
  };
};

export default {
  verifyAccount
};

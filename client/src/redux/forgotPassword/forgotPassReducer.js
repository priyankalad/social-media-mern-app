import { REQUEST, SUCCESS, FAILURE, CLEAR_USERNAME } from "./forgotPassActions";
const initialState = {
  loading: false,
  username: "",
  errorMessage: "",
};

const forgotPassReducer = (state = initialState, action) => {
  let { type, payload, error } = action;
  switch (type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        loading: false,
        username: payload.data.username,
        errorMessage: "",
      };
    case FAILURE:
      return {
        loading: false,
        username: "",
        errorMessage: error.response.data.message,
      };
    case CLEAR_USERNAME:
      return {
        ...state,
        username: "",
      };
    default:
      return state;
  }
};

export default forgotPassReducer;

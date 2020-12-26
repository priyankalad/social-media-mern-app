import { REQUEST, SUCCESS, FAILURE } from "./registerActions";

const initialState = {
  loading: false,
  successMessage: "",
  errorMessage: "",
  errorObj: null
};

const registerReducer = (state = initialState, action) => {
  let { type, payload, error } = action;
  switch (type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      };
    case SUCCESS:
      return {
        loading: false,
        successMessage: payload.data.message,
        errorMessage: ""
      };
    case FAILURE:
      let { message, errors } = error.response.data;
      return {
        loading: false,
        successMessage: "",
        errorMessage: message,
        errorObj: errors
      };
    default:
      return state;
  }
};

export default registerReducer;

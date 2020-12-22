import { REQUEST, SUCCESS, FAILURE } from "./accVerifyActions";

const initialState = {
  loading: false,
  errorMessage: "",
  successMessage: ""
};

const accVerifyReducer = (state = initialState, action) => {
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
      return {
        loading: false,
        successMessage: "",
        errorMessage: error.data
      };
    default:
      return state;
  }
};

export default accVerifyReducer;

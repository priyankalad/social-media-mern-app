import { REQUEST, SUCCESS, FAILURE } from "./resetPassActions";
const initialState = {
  loading: false,
  successMessage: "",
  errorMessage: "",
};

const resetPassReducer = (state = initialState, action) => {
  let { type, payload, error } = action;
  switch (type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      console.log(payload);
      return {
        loading: false,
        successMessage: payload.data.message,
        errorMessage: "",
      };
    case FAILURE:
      return {
        loading: false,
        successMessage: "",
        errorMessage: error.data,
      };
    default:
      return state;
  }
};

export default resetPassReducer;

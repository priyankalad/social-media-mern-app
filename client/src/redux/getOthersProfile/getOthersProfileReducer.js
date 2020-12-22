import { REQUEST, SUCCESS, FAILURE } from "./getOthersProfileActions";
const initial_state = {
  loading: false,
  user: {},
  errorMessage: ""
};

const otherUserProfileReducer = (state = initial_state, action) => {
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
        user: payload.data.user,
        errorMessage: ""
      };
    case FAILURE:
      return {
        loading: false,
        user: {},
        errorMessage: error.data
      };
    default:
      return state;
  }
};

export default otherUserProfileReducer;

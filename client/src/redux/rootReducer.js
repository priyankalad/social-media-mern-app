import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import allReducers from "./allReducers";

const {
  registerReducer,
  accVerifyReducer,
  forgotPassReducer,
  resetPassReducer,
  getOthersProfileReducer,
  followUnfollowReducer,
  userProfileReducer,
  postReducer
} = allReducers;
const rootReducer = combineReducers({
  register: registerReducer,
  form: formReducer,
  accVerify: accVerifyReducer,
  forgotPass: forgotPassReducer,
  resetPass: resetPassReducer,
  getOthersProfile: getOthersProfileReducer,
  followUnfollow: followUnfollowReducer,
  userProfile: userProfileReducer,
  post: postReducer
});

export default rootReducer;

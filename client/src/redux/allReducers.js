import registerReducer from "./register/registerReducer";
import accVerifyReducer from "./accountVerification/accVerifyReducer";
import forgotPassReducer from "./forgotPassword/forgotPassReducer";
import resetPassReducer from "./resetPassword/resetPassReducer";
import getOthersProfileReducer from "./getOthersProfile/getOthersProfileReducer";
import followUnfollowReducer from "./maintainFollowUnfollow/followUnfollowReducer";
import userProfileReducer from "./userProfile/userProfileReducer";
import postReducer from "./post/postReducer";

const allReducers = {
  registerReducer,
  accVerifyReducer,
  forgotPassReducer,
  resetPassReducer,
  followUnfollowReducer,
  getOthersProfileReducer,
  userProfileReducer,
  postReducer
};

export default allReducers;

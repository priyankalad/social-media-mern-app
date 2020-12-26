import registerActions from "./register/registerActions";
import accVerifyActions from "./accountVerification/accVerifyActions";
import forgotPassActions from "./forgotPassword/forgotPassActions";
import resetPassActions from "./resetPassword/resetPassActions";
import getOthersProfileActions from "./getOthersProfile/getOthersProfileActions";
import followUnfollowActions from "./maintainFollowUnfollow/followUnfollowAction";
import userProfileActions from "./userProfile/userProfileActions";
import postActions from "./post/postActions";

const allActions = {
  registerActions,
  accVerifyActions,
  forgotPassActions,
  resetPassActions,
  followUnfollowActions,
  getOthersProfileActions,
  userProfileActions,
  postActions
};

export default allActions;

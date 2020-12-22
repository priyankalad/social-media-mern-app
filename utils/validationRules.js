module.exports = {
  loginRules: {
    username: "required",
    password: "required"
  },
  registerRules: {
    //email: "required|email",
    username: "required|regex:/^[a-z0-9_-]{3,15}$/",
    displayName: "required|regex:/^[a-zA-Z ]+$/",
    password: "required|min:8|max:15|regex:/^(?=.*[0-9])/",
    confirmPassword: "required|same:password"
  },
  forgotPasswordRules: {
    username: "required"
  },
  resetPasswordRules: {
    password: "required|min:8|max:15|regex:/^(?=.*[0-9])/",
    confirmPassword: "same:password"
  },
  userProfileRules: {
    displayName: "required|regex:/^[a-zA-Z ]+$/",
    username: "required|regex:/^[a-z0-9_-]{3,15}$/",
    //  email: "required|email",
    location: "regex:/^[a-zA-Z0-9- ]{3,20}$/",
    gender: "alpha"
  },
  postRules: {
    title: "required|string",
    description: "string",
    postImageUrl: "string"
  },
  commentRules: {
    comment: "required|string"
  }
};

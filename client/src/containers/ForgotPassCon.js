import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import allActions from "../redux/allActions";
import { useSelector, useDispatch } from "react-redux";
import validateForm from "../formValidations/validations";
import ForgotPassword from "../components/ForgotPassword";
import { Redirect } from "react-router";

const validate = (values) => {
  return validateForm(values, "forgotpassword");
};

let ForgotPassCon = (props) => {
  const { errorMessage, username, loading } = useSelector(
    ({ forgotPass: { errorMessage, username, loading } }) => ({
      errorMessage,
      loading,
      username,
    })
  );
  let dispatch = useDispatch();
  

  return username ? (
    <Redirect to="/resetpassword" />
  ) : (
    <ForgotPassword
      reduxFormProps={props}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};
function onSubmit(values, dispatch) {
  dispatch(
    allActions.forgotPassActions.forgotPassword("/forgot-password", values)
  );
}
export default reduxForm({
  form: "forgotPasswordForm",
  onSubmit,
  validate,
})(ForgotPassCon);

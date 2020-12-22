import React from "react";
import { reduxForm } from "redux-form";
import allActions from "../redux/allActions";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import validateForm from "../formValidations/validations";

const validate = values => {
  return validateForm(values, "login");
};

let LoginCon = props => {
  const { errorMessage, loading, successMessage } = useSelector(
    ({ userProfile: { errorMessage, loading, successMessage } }) => ({
      errorMessage,
      loading,
      successMessage
    })
  );
  return (
    <Login
      loading={loading}
      errorMessage={errorMessage}
      deleteSuccess={successMessage}
      reduxFormProps={props}
    />
  );
};
function loginSubmit(values, dispatch, props) {
  dispatch(allActions.userProfileActions.login("/login", values)).then(() => {
    props.history.push("/");
  });
}

export default reduxForm({
  form: "loginForm",
  onSubmit: loginSubmit,
  validate
})(LoginCon);

import React from "react";
import { useSelector } from "react-redux";
import { reduxForm, SubmissionError } from "redux-form";
import allActions from "../redux/allActions";
import Register from "../components/Register";
import validateForm from "../formValidations/validations";

const validate = (values) => {
  return validateForm(values, "register");
};

let RegisterCon = (props) => {
  const { errorMessage, successMessage, loading } = useSelector(
    ({ register: { errorMessage, successMessage, loading } }) => ({
      errorMessage,
      successMessage,
      loading,
    })
  );

  return (
    <Register
      loading={loading}
      reduxFormProps={props}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

const onSubmit = (values, dispatch, props) => {
  return dispatch(
    allActions.registerActions.registerUser("/register", values)
  ).then((res) => {
    if (res.error) {
      let { errors } = res.error.response.data;
      if (errors) {
        throw new SubmissionError(errors);
      }
    } else {
      dispatch(props.reset("registerForm"));
    }
  });
};

export default reduxForm({
  form: "registerForm",
  onSubmit,
  validate,
})(RegisterCon);

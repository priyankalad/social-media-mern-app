import React, { useEffect } from "react";
import { reduxForm, SubmissionError } from "redux-form";
import allActions from "../redux/allActions";
import { useSelector, useDispatch, connect } from "react-redux";
import validateForm from "../formValidations/validations";
import ResetPassword from "../components/ResetPassword";

const validate = (values) => {
  return validateForm(values, "resetpassword");
};
let ResetPassCon = (props) => {
  let { errorMessage, loading, successMessage, username } = props;
  let dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(allActions.forgotPassActions.clearUsername());
    };
  }, []);

  return (
    <ResetPassword
      reduxFormProps={props}
      loading={loading}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

function mapStateToProps(state) {
  let {
    resetPass: { errorMessage, successMessage, loading },
    forgotPass: { username },
  } = state;
  return {
    errorMessage: errorMessage,
    successMessage: successMessage,
    loading: loading,
    username: username,
  };
}

function onSubmit(values, dispatch, props) {
  values.username = props.username;
  return dispatch(
    allActions.resetPassActions.resetPassword("/reset-password", values)
  ).then((res) => {
    if (res.error) {
      let { errors } = res.error.response.data;
      if (errors) {
        throw new SubmissionError(errors);
      }
    } else {
      dispatch(props.reset("resetPasswordForm"));
      dispatch(allActions.forgotPassActions.clearUsername());
    }
  });
}

export default connect(mapStateToProps)(
  reduxForm({
    form: "resetPasswordForm",
    onSubmit,
    validate,
  })(ResetPassCon)
);

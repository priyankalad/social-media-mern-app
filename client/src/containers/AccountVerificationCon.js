import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../redux/allActions";
import AccountVerification from "../components/AccountVerification";

export default function AccountVerificationForm(props) {
  const code = props.match.params.code;

  const { errorMessage, successMessage, loading } = useSelector(
    ({ accVerify: { errorMessage, successMessage, loading } }) => ({
      errorMessage,
      successMessage,
      loading
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      allActions.accVerifyActions.verifyAccount("/verify-account/" + code)
    );
  }, [dispatch, code]);
  return (
    <AccountVerification
      loading={loading}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
}

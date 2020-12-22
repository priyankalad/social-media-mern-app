import React from "react";
import renderFields from "./renderFields";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import Loading from "./Loading";

export default function ResetPassword(props) {
  const { renderInput } = renderFields;
  const { handleSubmit, pristine, invalid } = props.reduxFormProps;
  const { loading, successMessage, errorMessage } = props;
  return (
    <div className="container">
      <Loading isLoading={loading} />

      <div className="row">
        {/* <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"> */}
        <div className="col-12">
          <div className="card  my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Reset Password</h5>
              <h5 className="text-success text-center">{successMessage}</h5>
              <h5 className="text-danger text-center">{errorMessage}</h5>
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  label="Password"
                  component={renderInput}
                  type="password"
                />
                <Field
                  name="confirmPassword"
                  label="Confirm Password"
                  component={renderInput}
                  type="password"
                />
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                  disabled={loading || pristine || invalid}
                >
                  Submit
                </button>
                <br />
                <div className="text-center">
                  <Link className="btn btn-link" to={`/login`}>
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

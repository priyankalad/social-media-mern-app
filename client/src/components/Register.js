import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Field } from "redux-form";
import renderFields from "./renderFields";
const { renderInput } = renderFields;

export default function Register(props) {
  const { handleSubmit, reset, pristine, invalid } = props.reduxFormProps;
  let { loading, errorMessage, successMessage } = props;
  return (
    <div className="container">
      <Loading isLoading={loading} />

      <div className="row">
        {/* <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"> */}
        <div className="col-12">
          <div className="card  my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <h5 className="text-success text-center">{successMessage}</h5>
              <h5 className="text-danger text-center">{errorMessage}</h5>
              <form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  component={renderInput}
                  type="text"
                  label="Username"
                />
                <Field
                  name="displayName"
                  component={renderInput}
                  type="text"
                  label="Display Name"
                />

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
                  className="btn btn-md btn-primary text-uppercase"
                  type="submit"
                  disabled={loading || pristine || invalid}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="btn btn-md btn-secondary text-uppercase ml-3"
                >
                  Reset
                </button>
                <br />

                <Link className="btn btn-link" to={`/login`}>
                  Back to Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

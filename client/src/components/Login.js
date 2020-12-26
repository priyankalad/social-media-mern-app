import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import renderFields from "./renderFields";
const { renderInput } = renderFields;

export default function Login(props) {
  const { handleSubmit, pristine, invalid } = props.reduxFormProps;
  const { errorMessage, loading, deleteSuccess } = props;
  return (
    <div className="container">
      <Loading isLoading={loading} />
      <h5 className="text-success text-center">{deleteSuccess}</h5>
      <div className="row">
        {/* <div className="">col-sm-9 col-md-7 col-lg-5 mx-auto */}
        <div className="col-12">
          <div className="card  my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <h5 className="text-danger text-center">{errorMessage}</h5>
              <form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  component={renderInput}
                  label="Username"
                  type="text"
                />

                <Field
                  name="password"
                  component={renderInput}
                  label="Password"
                  type="password"
                />

                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                  disabled={loading || pristine || invalid}
                >
                  Sign in
                </button>
                <br />
                <div className="text-center">
                  <Link className="btn btn-link" to={`/register`}>
                    New User? Click to Register
                  </Link>
                  <Link className="btn btn-link" to={`/forgotpassword`}>
                    Forgot Password? Click to reset it
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

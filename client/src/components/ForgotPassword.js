import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import renderFields from "./renderFields";

export default function ForgotPassword(props) {
  const { handleSubmit, pristine, invalid } = props.reduxFormProps;
  const { loading, errorMessage } = props;
  const { renderInput } = renderFields;
  let isEmailEnable = process.env.ENABLE_EMAIL === "true";
  return (
    <div className="container">
      <Loading isLoading={loading} />

      <div className="row">
        {/* <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"> */}
        <div className="col-12">
          <div className="card  my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Forgot Password</h5>
              <h5 className="text-danger text-center">{errorMessage}</h5>
              <form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  component={renderInput}
                  label="Username"
                  type="username"
                />

                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                  disabled={loading || pristine || invalid}
                >
                  {isEmailEnable ? "Send" : "Proceed"}
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

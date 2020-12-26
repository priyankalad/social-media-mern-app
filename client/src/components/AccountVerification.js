import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function AccountVerification(props) {
  const { loading, successMessage, errorMessage } = props;
  return (
    <div className="container">
      <Loading isLoading={loading} />
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card  my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Account Verification</h5>
              <h5 className="text-danger text-center">{errorMessage}</h5>
              <h5 className="text-success text-center">{successMessage}</h5>

              <br />
              <div className="text-center">
                <Link className="btn btn-link" to={`/login`}>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

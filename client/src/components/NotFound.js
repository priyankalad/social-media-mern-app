import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 align-items-center">
          <div>Oops... Page not found </div>
          <Link to="/">Go to home page</Link>
        </div>
      </div>
    </div>
  );
}

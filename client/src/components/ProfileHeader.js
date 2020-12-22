import React from "react";

export default function ProfileHeader(props) {
  let { viewMode, changeViewModeHandler } = props;
  return (
    <div className="d-inline-flex">
      <button
        style={{ visibility: viewMode === "view" ? "visible" : "hidden" }}
        className="btn btn-outline-primary ml-3"
        title="Edit Profile"
        onClick={() => changeViewModeHandler("edit")}
      >
        <i className="fa fa-pencil" aria-hidden="true"></i>
      </button>
    </div>
  );
}

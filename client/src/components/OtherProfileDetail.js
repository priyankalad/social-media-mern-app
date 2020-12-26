import React from "react";
import formateDate from "../utils/formateDate";
import FollowButtonCon from "../containers/FollowButtonCon";
import UnfollowButtonCon from "../containers/UnfollowButtonCon";

export default function OtherProfileDetail(props) {
  let { user, token, dispatch, showFollowButton, hideButton } = props;
  return (
    <>
      <div className="col-3">
        <img
          className="rounded-circle"
          height="100"
          width="100"
          alt="Profile Pic"
          src={
            user.profilePicPath
              ? user.profilePicPath
              : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
          }
        />
      </div>
      <div className="col-6">
        <span className="font-weight-bold">{user.displayName}</span>
        <p className="text-muted small">{user.username}</p>
        <p className="text-muted">
          Joined On {formateDate(new Date(user.createdOn), "MMM, yyyy")}
        </p>
      </div>
      {hideButton ? (
        ""
      ) : (
        <div className="col-3 text-center">
          {showFollowButton ? (
            <FollowButtonCon user={user} token={token} dispatch={dispatch} />
          ) : (
            <UnfollowButtonCon user={user} token={token} dispatch={dispatch} />
          )}
        </div>
      )}
    </>
  );
}

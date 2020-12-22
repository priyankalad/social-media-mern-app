import React from "react";
import { Link } from "react-router-dom";
import FollowButtonCon from "../containers/FollowButtonCon";
import UnfollowButtonCon from "../containers/UnfollowButtonCon";

export default function UserCard(props) {
  let { user, token, dispatch, showFollowButton, hideButton } = props;
  return (
    <div key={user._id} className="card mt-2">
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img
              className="rounded-circle"
              height="60"
              width="60"
              alt="Profile Pic"
              src={
                user.profilePicPath
                  ? user.profilePicPath
                  : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
              }
            />
          </div>
          <div className="col-9">
            <Link className=" btn btn-link" to={`/profile/${user._id}`}>
              <h6> {user.displayName}</h6>
              <small>{user.username}</small>
            </Link>

            {hideButton ? (
              ""
            ) : (
              <div className="text-center">
                {showFollowButton ? (
                  <FollowButtonCon
                    user={user}
                    token={token}
                    dispatch={dispatch}
                  />
                ) : (
                  <UnfollowButtonCon
                    user={user}
                    token={token}
                    dispatch={dispatch}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

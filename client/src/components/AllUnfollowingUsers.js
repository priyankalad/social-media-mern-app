import React from "react";
import Loading from "./Loading";
import UserCard from "./UserCard";

export default function AllUnfollowingUsers(props) {
  let { loading, users, token, dispatch } = props;
  return loading ? (
    <Loading isLoading={loading} />
  ) : (
    <div className="container">
      <div className="row">
        {users &&
          users.map(user => (
            <div key={user._id} className="col-md-6">
              <UserCard
                key={user._id}
                user={user}
                token={token}
                dispatch={dispatch}
                showFollowButton={!user.isFollowing}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

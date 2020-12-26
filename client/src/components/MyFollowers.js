import React from "react";
import Loading from "./Loading";
import UserCard from "./UserCard";

export default function MyFollowers(props) {
  let { loading, users, token, dispatch } = props;
  return loading ? (
    <Loading isLoading={loading} />
  ) : users && users.length > 0 ? (
    <div className="container">
      <div className="row">
        {users.map(user => (
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
  ) : (
    <div className="text-center mt-4">
      <p style={{ color: "dimgrey" }}>No one is following you</p>
    </div>
  );
}

import React from "react";
import UserCard from "./UserCard";

export default function OthersFollowing(props) {
  let { following } = props;
  return following && following.length > 0 ? (
    <div className="container">
      <div className="row">
        {following.map(user => (
          <div key={user._id} className="col-md-6">
            <UserCard key={user._id} user={user} hideButton={true} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>This user is not following anyone </div>
  );
}

import React from "react";
import UserCard from "./UserCard";

export default function OthersFollowers(props) {
  let { followers } = props;
  return followers && followers.length > 0 ? (
    <div className="container">
      <div className="row">
        {followers.map(user => (
          <div key={user._id} className="col-md-6">
            <UserCard key={user._id} user={user} hideButton={true} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>There are no followers of this user </div>
  );
}

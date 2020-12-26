import React from "react";

export default function FollowButton(props) {
  let { loading, followId, userId, handleFollowUser } = props;
  return (
    <button onClick={handleFollowUser} className="btn btn-outline-primary">
      {loading && followId === userId ? "..." : "Follow"}
    </button>
  );
}

import React from "react";

export default function UnfollowButton(props) {
  let { handleUnfollowUser, unfollowId, userId, loading } = props;
  return (
    <button onClick={handleUnfollowUser} className="btn btn-primary">
      {loading && unfollowId === userId ? "..." : "Unfollow"}
    </button>
  );
}

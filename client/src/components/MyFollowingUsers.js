import React from "react";
import Loading from "./Loading";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

export default function MyFollowingUsers(props) {
  let { loading, users, token, dispatch } = props;

  return loading ? (
    <Loading isLoading={loading} />
  ) : (
    <div className="container">
      <div className="row">
        {users &&
          ((users.length > 0 &&
            users.map(user => (
              <div key={user._id} className="col-md-6">
                <UserCard
                  key={user._id}
                  user={user}
                  token={token}
                  dispatch={dispatch}
                  showFollowButton={false}
                />
              </div>
            ))) || (
            <div className="offset-2 col-8 mt-5">
              <h5>You are not following anyone</h5>
              <Link
                className="btn btn-outline-primary mt-3 text-center"
                to="/allunfollowing"
              >
                Start Exporing
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

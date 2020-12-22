import React from "react";
import UserCard from "./UserCard";
import Loading from "./Loading";

export default function UnfollowingUsers(props) {
  let { loading, token, dispatch, users, handleRefresh } = props;
  //let randomUsers = getRandomNUsers(users, 4);
  let randomUsers = users.slice(0, 4);

  return (
    <div>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card bg-light">
                <h5 className="card-title text-center pt-3">
                  People you may know
                  <button className="btn" onClick={handleRefresh}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {randomUsers &&
                randomUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    token={token}
                    dispatch={dispatch}
                    showFollowButton={true}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { Switch } from "react-router-dom";
import OthersDetails from "./OthersDetails";
import OthersPost from "./OthersPost";
import PrivateRoute from "./PrivateRoute";
import OthersFollowers from "./OthersFollowers";
import OthersFollowing from "./OthersFollowing";
import OthersProfileNav from "../components/OthersProfileNav";
import OtherProfileDetail from "./OtherProfileDetail";

export default function ViewOthersProfile(props) {
  let {
    beingFollowed,
    activeTab,
    handleTabSelect,
    userid,
    token,
    dispatch,
    user,
    showFollowButton
  } = props;
  console.log(user);
  return (
    <div className="container-fluid">
      <div className="row">
        <OtherProfileDetail
          token={token}
          dispatch={dispatch}
          user={user}
          showFollowButton={!beingFollowed || showFollowButton}
        />
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <OthersProfileNav
            activeTab={activeTab}
            userid={userid}
            handleTabSelect={handleTabSelect}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <OthersDetails>
            <Switch>
              <PrivateRoute
                path="/profile/:userid/followers"
                component={() => <OthersFollowers followers={user.followers} />}
              />
              <PrivateRoute
                path="/profile/:userid/following"
                component={() => <OthersFollowing following={user.following} />}
              />
              <PrivateRoute
                exact
                path="/profile/:userid"
                component={() => <OthersPost posts={user.posts} />}
              />
            </Switch>
          </OthersDetails>
        </div>
      </div>
    </div>
  );
}

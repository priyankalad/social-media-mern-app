import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import ViewOthersProfile from "../components/ViewOthersProfile";

export default function ViewOthersProfileCon(props) {
  let { userid } = props.match.params;
  const [activeTab, setActiveTab] = useState(0);
  let dispatch = useDispatch();

  let {
    user,
    token,
    followingUsers: loggedInUserFollowing,
    showFollowButton
  } = useSelector(
    ({
      getOthersProfile: { user },
      userProfile: { token },
      followUnfollow: { showFollowButton, followingUsers }
    }) => ({
      user,
      token,
      followingUsers,
      showFollowButton
    })
  );
  let handleTabSelect = tabIndex => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    dispatch(
      allActions.getOthersProfileActions.getOtherUserProfile(
        `/user/profile/${userid}`,
        token
      )
    );
    return () => {
      //cleanup
    };
  }, [dispatch, userid, token]);
  let beingFollowed = isUserBeingFollowed(user._id, loggedInUserFollowing);
  return (
    <ViewOthersProfile
      beingFollowed={beingFollowed}
      handleTabSelect={handleTabSelect}
      activeTab={activeTab}
      token={token}
      dispatch={dispatch}
      userid={userid}
      user={user}
      showFollowButton={showFollowButton}
    />
  );
}

function isUserBeingFollowed(userId, loggedInUserFollowing) {
  if (!loggedInUserFollowing) return false;
  for (let index = 0; index < loggedInUserFollowing.length; index++) {
    if (loggedInUserFollowing[index]._id === userId) return true;
  }
  return false;
}

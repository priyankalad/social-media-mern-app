import React from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../redux/allActions";
import { useEffect } from "react";
import UnfollowingUsers from "../components/UnfollowingUsers";

export default function UnfollowingUsersCon() {
  let dispatch = useDispatch();
  let { token, isLoggedIn, sideLoading, unfollowingUsers } = useSelector(
    ({
      userProfile: { token, isLoggedIn },
      followUnfollow: { sideLoading, unfollowingUsers }
    }) => ({
      token,
      isLoggedIn,
      sideLoading,
      unfollowingUsers
    })
  );

  let getUnfollowingUsers = () => {
    dispatch(
      allActions.followUnfollowActions.getNUnfollowingUsers(
        "/user/unfollowing/4",
        token
      )
    );
  };

  let handleRefresh = () => {
    getUnfollowingUsers();
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUnfollowingUsers();
    }
  }, [isLoggedIn, dispatch, token]);

  return isLoggedIn && unfollowingUsers && unfollowingUsers.length > 0 ? (
    <UnfollowingUsers
      loading={sideLoading}
      users={unfollowingUsers}
      dispatch={dispatch}
      token={token}
      handleRefresh={handleRefresh}
    />
  ) : (
    ""
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../redux/allActions";
import { useEffect } from "react";
import AllUnfollowingUsers from "../components/AllUnfollowingUsers";

export default function MyAllUnfollowingUsersCon() {
  let dispatch = useDispatch();
  let { token, isLoggedIn, centralLoading, unfollowingUsers } = useSelector(
    ({
      userProfile: { token, isLoggedIn },
      followUnfollow: { centralLoading, unfollowingUsers }
    }) => ({
      token,
      isLoggedIn,
      centralLoading,
      unfollowingUsers
    })
  );

  let getUnfollowingUsers = () => {
    dispatch(
      allActions.followUnfollowActions.getUnfollowingUsers(
        "/user/unfollowing/all",
        token
      )
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUnfollowingUsers();
    }
  }, [isLoggedIn, dispatch, token]);

  return isLoggedIn && unfollowingUsers && unfollowingUsers.length > 0 ? (
    <AllUnfollowingUsers
      loading={centralLoading}
      users={unfollowingUsers}
      token={token}
      dispatch={dispatch}
    />
  ) : (
    ""
  );
}

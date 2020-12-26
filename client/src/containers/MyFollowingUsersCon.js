import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import MyFollowingUsers from "../components/MyFollowingUsers";
export default function MyFollowingUsersCon(props) {
  let { centralLoading, followingUsers, token } = useSelector(
    ({
      followUnfollow: { centralLoading, followingUsers },
      userProfile: { token }
    }) => ({
      centralLoading,
      followingUsers,
      token
    })
  );

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      allActions.followUnfollowActions.getFollowingUsers(
        "/user/following",
        token
      )
    );
  }, [dispatch, token]);
  return (
    <MyFollowingUsers
      loading={centralLoading}
      users={followingUsers}
      token={token}
      dispatch={dispatch}
    />
  );
}

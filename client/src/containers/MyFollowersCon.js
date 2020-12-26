import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import MyFollowers from "../components/MyFollowers";
export default function MyFollowersCon(props) {
  let { centralLoading, followers, token, followingUsers } = useSelector(
    ({
      followUnfollow: { centralLoading, followers, followingUsers },
      userProfile: { token }
    }) => ({
      centralLoading,
      followers,
      token,
      followingUsers
    })
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      allActions.followUnfollowActions.getMyFollowers("/user/followers", token)
    );
  }, [dispatch, token]);

  attachFollowFlag(followers, followingUsers);

  return (
    <MyFollowers
      loading={centralLoading}
      users={followers}
      token={token}
      dispatch={dispatch}
    />
  );
}

let attachFollowFlag = (followers, following) => {
  let hashSet = new Set();
  following.forEach(u => hashSet.add(u._id));

  followers.forEach(u => {
    u.isFollowing = hashSet.has(u._id) ? true : false;
  });
};

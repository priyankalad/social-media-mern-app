import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import allActions from "../redux/allActions";
import FollowButton from "../components/FollowButton";

export default function FollowButtonCon(props) {
  let { user, token, dispatch } = props;
  useEffect(() => {
    return () => {
      dispatch(allActions.followUnfollowActions.clearShowFollowButton());
    };
  }, [dispatch]);

  let handleFollowUser = () => {
    dispatch(
      allActions.followUnfollowActions.followUser(
        "/user/follow",
        user._id,
        token
      )
    );
  };

  const { followButtonLoading, followId } = useSelector(
    ({ followUnfollow: { followButtonLoading, followId } }) => ({
      followButtonLoading,
      followId
    })
  );

  return (
    <FollowButton
      handleFollowUser={handleFollowUser}
      loading={followButtonLoading}
      userId={user._id}
      followId={followId}
    />
  );
}

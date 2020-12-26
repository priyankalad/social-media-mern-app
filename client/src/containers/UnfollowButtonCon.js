import React from "react";
import allActions from "../redux/allActions";
import { useSelector } from "react-redux";
import UnfollowButton from "../components/UnfollowButton";

export default function UnfollowButtonCon(props) {
  let { user, token, dispatch } = props;
  let { unfollowButtonLoading, unfollowId } = useSelector(
    ({ followUnfollow: { unfollowButtonLoading, unfollowId } }) => ({
      unfollowButtonLoading,
      unfollowId
    })
  );
  let handleUnfollowUser = () => {
    dispatch(
      allActions.followUnfollowActions.unfollowUser(
        "/user/unfollow",
        user._id,
        token
      )
    );
  };

  return (
    <UnfollowButton
      handleUnfollowUser={handleUnfollowUser}
      unfollowId={unfollowId}
      userId={user._id}
      loading={unfollowButtonLoading}
    />
  );
}

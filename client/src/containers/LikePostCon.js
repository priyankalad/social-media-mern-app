import React from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import LikePost from "../components/LikePost";

export default function LikePostCon(props) {
  let { post } = props;

  let dispatch = useDispatch();

  let handleClick = () =>
    dispatch(
      allActions.postActions.toggleLikePost(
        "/user/post/toggle-like",
        post._id,
        token
      )
    );

  const { smallLoading, posts, postId, likedCount, token } = useSelector(
    ({
      post: { smallLoading, posts, postId, likedCount },
      userProfile: { token }
    }) => ({
      smallLoading,
      posts,
      likedCount,
      postId,
      token
    })
  );

  return (
    <LikePost
      post={post}
      likedPosts={posts}
      likedCount={likedCount}
      postId={postId}
      smallLoading={smallLoading}
      handleClick={handleClick}
    />
  );
}

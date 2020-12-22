import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import Post from "../components/Post";
import { Redirect } from "react-router";

let AllPostsCon = (props) => {
  const dispatch = useDispatch();
  const [redirectTo, setRedirectTo] = useState(false);
  const { token, posts, smallLoading, postId } = useSelector(
    ({ post: { posts, smallLoading, postId }, userProfile: { token } }) => ({
      token,
      posts,
      smallLoading,
      postId,
    })
  );
  useEffect(() => {
    dispatch(allActions.postActions.getAllPosts("/user/post", token)).then(
      (res) => {
        let { posts } = res.payload.data;
        if (res.type.indexOf("SUCCESS") !== -1 && posts && posts.length === 0)
          setRedirectTo(true);
      }
    );
    return () => {
      dispatch(allActions.postActions.clearState());
    };
  }, [dispatch, token]);
  return redirectTo ? (
    <Redirect to="/createpost" />
  ) : (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            postId={postId}
            smallLoading={smallLoading}
          />
        ))}
    </>
  );
};

export default AllPostsCon;

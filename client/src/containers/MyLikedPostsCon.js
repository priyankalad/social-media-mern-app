import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import Post from "../components/Post";
import Loading from "../components/Loading";

let MyLikedPostsCon = (props) => {
  console.log("My liked post page");
  const dispatch = useDispatch();
  const { token, posts, postId, loading, smallLoading } = useSelector(
    ({
      userProfile: { token },
      post: { posts, postId, loading, smallLoading },
    }) => ({
      token,
      posts,
      postId,
      smallLoading,
      loading,
    })
  );

  useEffect(() => {
    dispatch(allActions.postActions.getAllPosts("/user/post", token));
  }, [dispatch, token]);
  let likedPosts = posts.filter((p) => p.liked);
  let content = (
    <>
      {likedPosts && likedPosts.length > 0 ? (
        likedPosts.map((post) => {
          post.liked = true;
          return (
            <Post
              key={post._id}
              post={post}
              postId={postId}
              smallLoading={smallLoading}
            />
          );
        })
      ) : (
        <div className="text-center mt-4">
          <p style={{ color: "dimgrey" }}>You have not liked any post yet</p>
        </div>
      )}
    </>
  );
  return loading ? <Loading isLoading={loading} /> : content;
};

export default MyLikedPostsCon;

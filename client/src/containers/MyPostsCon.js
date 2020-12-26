import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import Post from "../components/Post";
import { Link } from "react-router-dom";

let MyPostsCon = props => {
  const dispatch = useDispatch();
  const { token, posts, user, smallLoading, postId } = useSelector(
    ({
      userProfile: { user, token },
      post: { posts, smallLoading, postId }
    }) => ({
      token,
      posts,
      user,
      smallLoading,
      postId
    })
  );
  let myposts = posts.filter(p => p.postedBy.id === user._id);

  let deletePostHandler = postId =>
    dispatch(
      allActions.postActions.deletePost("/user/post/delete", postId, token)
    );
  useEffect(() => {
    dispatch(allActions.postActions.getAllPosts("/user/post", token));
  }, [dispatch, token]);
  return (
    <>
      {myposts && myposts.length > 0 ? (
        myposts.map(post => (
          <Post
            key={post._id}
            post={post}
            deletable={true}
            deletePostHandler={deletePostHandler}
            smallLoading={smallLoading}
            postId={postId}
          />
        ))
      ) : (
        <div className="text-center mt-4">
          <p style={{ color: "dimgrey" }}>
            you have not created any post yet.{" "}
          </p>
          <Link to="/createpost" className="btn btn-link">
            Create Post
          </Link>
        </div>
      )}
    </>
  );
};

export default MyPostsCon;

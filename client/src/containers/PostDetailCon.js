import React, { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import { useSelector } from "react-redux";

export default function PostDetailCon(props) {
  let { postId } = props.match.params;
  const [post, setPost] = useState(null);
  const [modalShow, setModalShow] = useState("");
  const [modalDisplay, setModalDisplay] = useState("none");
  let { posts } = useSelector(({ post: { posts } }) => ({ posts }));
  useEffect(() => {
    let postIndex = posts.findIndex(p => p._id === postId);
    setPost(posts[postIndex]);
  }, [posts]);

  let handleShowCommentModal = () => {
    setModalShow("show");
    setModalDisplay("block");
  };

  let handleHideCommentModal = () => {
    setModalShow("");
    setModalDisplay("none");
  };
  return post ? (
    <PostDetail
      handleShowCommentModal={handleShowCommentModal}
      handleHideCommentModal={handleHideCommentModal}
      modalDisplay={modalDisplay}
      modalShow={modalShow}
      post={post}
    />
  ) : null;
}

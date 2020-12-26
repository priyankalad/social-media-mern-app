import React from "react";
import CommentModal from "../components/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../redux/allActions";
import Loading from "../components/Loading";

export default function CreateCommentCon(props) {
  let { post, modalShow, modalDisplay, handleHideCommentModal } = props;
  const { token, loading } = useSelector(
    ({ userProfile: { token }, post: { loading } }) => ({
      token,
      loading
    })
  );
  let dispatch = useDispatch();

  let handleCreateComment = comment => {
    dispatch(
      allActions.postActions.createComment(
        "/user/post/comment",
        token,
        post._id,
        comment
      )
    ).then(res => {
      if (!res.error) {
        handleHideCommentModal();
      }
    });
  };
  return loading ? (
    <Loading isLoading={loading} />
  ) : (
    <CommentModal
      handleCreateComment={handleCreateComment}
      post={post}
      modalShow={modalShow}
      modalDisplay={modalDisplay}
      handleHideCommentModal={handleHideCommentModal}
    />
  );
}

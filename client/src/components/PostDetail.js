import React, { useState } from "react";
import { Link } from "react-router-dom";
import formateDate from "../utils/formateDate";
import CreateCommentCon from "../containers/CreateCommentCon";
import LikePostCon from "../containers/LikePostCon";

export default function PostDetail(props) {
  let {
    post,
    deletable,
    deletePostHandler,
    postId,
    handleShowCommentModal,
    handleHideCommentModal,
    modalDisplay,
    modalShow
  } = props;

  let postedOn = formateDate(new Date(post.postedOn));

  return (
    <>
      {modalShow === "show" ? (
        <CreateCommentCon
          post={post}
          modalShow={modalShow}
          modalDisplay={modalDisplay}
          handleHideCommentModal={handleHideCommentModal}
        />
      ) : (
        ""
      )}
      <div className="container">
        <div className="row">
          <div className="col-2">
            <img
              alt="Profile Pic"
              src={
                post.postedBy.profilePicPath
                  ? post.postedBy.profilePicPath
                  : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
              }
              width="60"
              height="60"
              className="rounded-circle"
            />
          </div>
          <div className="col-10">
            <Link
              to={`/profile/${post.postedBy.id}`}
              className="font-weight-bold"
            >
              {post.postedBy.displayName}
            </Link>
            <div className="text-muted">{post.postedBy.username}</div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-10 h4" style={{ whiteSpace: "pre-line" }}>
            {post.title}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <img
              alt={post.tile}
              src={`${post.postImageUrl}`}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "30px"
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6 text-muted">{postedOn}</div>
          <div className="col-6  text-right">
            <button
              className="btn btn-link pr-1"
              onClick={handleShowCommentModal}
            >
              <i className="fa fa-comment-o" aria-hidden="true"></i>
            </button>

            <span className="small text-primary">{post.comments.length}</span>

            <LikePostCon post={post} liked={post.liked} />

            {deletable ? (
              <button
                className="btn btn-link ml-3"
                onClick={() => deletePostHandler(post._id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            ) : (
              <></>
            )}

            {post._id === postId ? (
              <div className="ml-3">
                <i
                  className="fa fa-spinner fa-2x"
                  style={{ color: "#007bff" }}
                  aria-hidden="true"
                ></i>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {post.comments.length > 0 &&
          post.comments.map(p => {
            let {
              commentedBy: { id, username, displayName, profilePicPath },
              commentedOn,
              comment
            } = p;

            return (
              <div className="row mt-2 p-2 user-comment">
                <div className="col-2">
                  <img
                    className="rounded-circle"
                    height="50"
                    width="50"
                    alt="Profile Pic"
                    src={
                      profilePicPath
                        ? profilePicPath
                        : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
                    }
                  />
                </div>
                <div className="col-10">
                  <Link to={`/profile/${id}`} className="font-weight-bold">
                    {displayName}
                  </Link>
                  <span className="text-muted">{username}</span>
                  <div className="text-muted">
                    {formateDate(new Date(commentedOn))}
                  </div>
                  <div style={{ whiteSpace: "pre-line" }}>{comment}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

import React, { useState } from "react";
import formateDate from "../utils/formateDate";
import { Link } from "react-router-dom";
import LikePostCon from "../containers/LikePostCon";
import CreateCommentCon from "../containers/CreateCommentCon";
import "../index.css";
export default function Post(props) {
  let { post, deletable, deletePostHandler, postId, smallLoading } = props;
  const [modalShow, setModalShow] = useState("");
  const [modalDisplay, setModalDisplay] = useState("none");
  let postedOn = formateDate(new Date(post.postedOn));
  let [viewWholePostImage, setViewWholePostImage] = useState(false);

  let handleShowCommentModal = () => {
    setModalShow("show");
    setModalDisplay("block");
  };

  let handleHideCommentModal = () => {
    setModalShow("");
    setModalDisplay("none");
  };

  let viewPostImage = () => {
    setViewWholePostImage(true);
  };
  let closePostImage = () => {
    setViewWholePostImage(false);
  };

  let postContent = (
    <>
      <div className="card" key={post._id}>
        <div className="card-body">
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
              <div className="row">
                <div className="col-12">
                  <span className="font-weight-bold">
                    <Link to={`/profile/${post.postedBy.id}`}>
                      {post.postedBy.displayName}
                    </Link>
                  </span>
                  <span className="ml-2 text-muted">
                    {post.postedBy.username}
                  </span>
                  <span className="ml-2 text-muted small">{postedOn}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <p>
                    <Link
                      to={{
                        pathname: "/post/" + post._id,
                      }}
                      className="text-dark"
                      style={{ textDecoration: "none", whiteSpace: "pre-line" }}
                    >
                      {post.title}
                    </Link>
                  </p>
                </div>
              </div>
              {post.postImageUrl ? (
                <div className="row mt-2">
                  <div className="col-12">
                    <div
                      onClick={viewPostImage}
                      className="postImage"
                      style={{
                        backgroundImage: "url(" + post.postImageUrl + ")",
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="row mt-1 ml-1">
                <div>
                  <button
                    className="btn btn-link pr-2"
                    onClick={handleShowCommentModal}
                  >
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                  </button>

                  <span className="small text-primary">
                    {post.comments.length}
                  </span>
                </div>
                <div className="ml-4">
                  <LikePostCon post={post} liked={post.liked} />
                </div>
                {deletable ? (
                  <div className=" text-center my-auto ml-4">
                    <button
                      className="btn btn-link"
                      onClick={() => deletePostHandler(post._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                {post._id === postId && smallLoading ? (
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
          </div>
        </div>
      </div>

      <div className={viewWholePostImage ? "wholePostImage" : "d-none"}>
        <span className="closeWholePostImage" onClick={closePostImage}>
          &times;
        </span>
        <img className="wholePostImageContent" src={post.postImageUrl} />
      </div>
    </>
  );
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
      {postContent}
    </>
  );
}

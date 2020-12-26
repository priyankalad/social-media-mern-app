import React, { useRef } from "react";

export default function CommentModal({
  modalShow,
  modalDisplay,
  post,
  handleHideCommentModal,
  handleCreateComment
}) {
  let commentRef = useRef();
  return (
    <div
      className={`modal fade ${modalShow}`}
      style={{ display: modalDisplay }}
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <div className="modal-header">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={handleHideCommentModal}
            >
              X
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="commentDiv">
                <textarea
                  ref={commentRef}
                  rows="2"
                  placeholder="Write your comment"
                  className="commentBox"
                />
              </div>
              <div className="card mt-3 p-3">
                <p className="card-text">{post.title}</p>
                <img
                  alt={post.title}
                  src={post.postImageUrl}
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "30px"
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleCreateComment(commentRef.current.value)}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function LikePost(props) {
  let { handleClick, post, likedCount, postId } = props;
  let likedIcon = <i className="fa fa-thumbs-up" aria-hidden="true"></i>;
  let unlikedIcon = <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>;
  return (
    <>
      <button onClick={handleClick} className="btn btn-link pr-1 ml-3">
        {post.liked ? likedIcon : unlikedIcon}
      </button>

      <span className="small text-primary">
        {postId && post._id.toString() === postId.toString() && likedCount >= 0
          ? likedCount
          : post.likedByUsers.length}
      </span>
    </>
  );
}

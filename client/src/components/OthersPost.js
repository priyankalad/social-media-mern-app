import React from "react";
import Post from "./Post";

export default function OthersPost(props) {
  let { posts } = props;
  return posts && posts.length > 0 ? (
    <div>{posts && posts.map(post => <Post key={post._id} post={post} />)}</div>
  ) : (
    <div>This user has not posted anything</div>
  );
}

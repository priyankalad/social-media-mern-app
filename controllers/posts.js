let Post = require("../models/Post");
let User = require("../models/User");
var ObjectId = require("mongodb").ObjectID;
let queries = require("../queries/post");

module.exports = {
  createPostController: async function(req, res, next) {
    let { title } = req.body;
    if (!title)
      return res.status(422).json({
        message: "Please provide the title for the post"
      });
    let {
      user: { _id, username, displayName, profilePicPath },
      imageURL
    } = res.locals;
    let postObj = {
      ...req.body,
      postedBy: {
        id: _id,
        username: username,
        displayName: displayName,
        profilePicPath: profilePicPath
      },
      postImageUrl: imageURL
    };
    try {
      let createdPost = await queries.createPost(postObj);
      createdPost = createdPost.toObject();
      createdPost.liked = false;
      res.status(201).json({
        message: "Post is created",
        post: createdPost
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  deletePostController: async function(req, res, next) {
    let { postId } = req.body;
    try {
      let result = await queries.deletePost(postId);
      if (result.deletedCount > 0) {
        res.status(200).json({
          deletedPostId: postId
        });
      } else {
        res.status(400).json({
          message: "Invalid Post ID"
        });
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  getPostsController: async function(req, res, next) {
    let { user } = res.locals;
    const postedByIds = [...user.following, user._id];
    try {
      let posts = await queries.getPostsByUserIds(postedByIds);
      let postsWithExtraProps = queries.postsWithExtraProps(posts, user._id);
      return res.status(200).json({
        posts: postsWithExtraProps
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  getMyPostsController: async function(req, res, next) {
    let { user } = res.locals;
    try {
      let myPosts = await queries.getPostsByUserId(user._id);
      let postsWithExtraProps = queries.postsWithExtraProps(myPosts, user._id);
      return res.status(200).json({
        posts: postsWithExtraProps
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  getMyLikedPostsController: async function(req, res, next) {
    let { user } = res.locals;
    try {
      let posts = await queries.getLikedPosts(user);
      return res.status(200).json({
        posts: posts
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  toggleLikePostController: async function(req, res, next) {
    let { user } = res.locals;
    let { postId } = req.body;
    try {
      let post = await queries.getPostById(postId);
      if (!post) return res.status(401).json({ message: "Invalid post id" });
      let updatedPost = null;
      let message = "";
      if (post.likedByUsers.includes(ObjectId(user._id))) {
        updatedPost = await queries.unLikePost(postId, user._id);
        updatedPost.liked = false;
      } else {
        updatedPost = await queries.likePost(postId, user._id);
        updatedPost.liked = true;
      }
      return res.status("200").json({
        post: updatedPost,
        likeCount: updatedPost.likedByUsers.length,
        message: message
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  createCommentController: async function(req, res, next) {
    let {
      user: { _id, username, displayName, profilePicPath }
    } = res.locals;
    let { comment, postId } = req.body;
    let commentObj = {
      commentedBy: {
        id: _id,
        username: username,
        displayName: displayName,
        profilePicPath: profilePicPath
      },
      postId: postId,
      comment: comment
    };
    try {
      let updatedPost = await queries.createComment(postId, commentObj);
      return res.status(201).json({
        post: updatedPost
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
};

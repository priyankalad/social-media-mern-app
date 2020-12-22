var Post = require("../models/Post");

module.exports = {
  createPost: async post => {
    let createdPost = await Post.create(post);
    return createdPost;
  },
  deletePost: async postId => {
    let result = await Post.deleteOne({ _id: postId }).exec();
    return result;
  },
  getPostById: async postId => {
    let post = await Post.findById({ _id: postId }).exec();
    return post;
  },
  getPostsByUserId: async userId => {
    let posts = await Post.find(
      {
        "postedBy.id": userId
      },
      null,
      { sort: { postedOn: -1 } }
    ).exec();
    return posts;
  },
  getPostsByUserIds: async userIds => {
    let posts = await Post.find(
      {
        "postedBy.id": {
          $in: userIds
        }
      },
      null,
      { sort: { postedOn: -1 } }
    ).exec();
    return posts;
  },
  postsWithExtraProps: (posts, userId) => {
    let arrPosts = [...posts];
    let postsToUpdate = arrPosts.map(post => ({
      ...post.toObject(),
      liked: post.likedByUsers.includes(userId)
    }));
    return postsToUpdate;
  },

  getLikedPosts: async user => {
    let posts = await Post.find({
      likedByUsers: {
        $in: [user._id]
      }
    });
    posts = posts.map(post => ({
      ...post.toObject(),
      liked: true
    }));

    return posts;
  },
  unLikePost: async (postId, userId) => {
    let result = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          likedByUsers: userId
        }
      },
      { new: true }
    ).exec();
    return result.toObject();
  },

  likePost: async (postId, userId) => {
    let result = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: {
          likedByUsers: userId
        }
      },
      { new: true }
    ).exec();

    return result ? result.toObject() : result;
  },
  createComment: async (postId, commentObj) => {
    let result = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            $each: [commentObj],
            $position: 0
          }
        }
      },
      { new: true }
    ).exec();
    return result;
  }
};

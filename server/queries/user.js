var User = require("../models/User");
var Post = require("../models/Post");
var ObjectId = require("mongodb").ObjectID;
let postQueries = require("./post");

module.exports = {
  getAllUnfollowingUsers: async (user) => {
    let users = User.find(
      {
        $and: [{ _id: { $ne: user._id } }, { _id: { $nin: user.following } }],
      },
      { displayName: 1, username: 1, profilePicPath: 1, location: 1 }
    ).exec();
    return users;
  },
  getNUnfollowingUsers: async (user, n) => {
    let users = await User.aggregate([
      {
        $project: {
          displayName: 1,
          username: 1,
          profilePicPath: 1,
          location: 1,
        },
      },
      {
        $match: {
          $and: [{ _id: { $ne: user._id } }, { _id: { $nin: user.following } }],
        },
      },
      { $sample: { size: n } },
    ]).exec();
    return users;
  },
  getFollowingUsers: async (user) => {
    let users = await User.find(
      {
        _id: {
          $in: user.following,
        },
      },
      { displayName: 1, username: 1, profilePicPath: 1, location: 1 }
    ).exec();
    return users;
  },
  getFollowers: async (user) => {
    let users = await User.find(
      {
        following: {
          $elemMatch: {
            $eq: user._id,
          },
        },
      },
      { displayName: 1, username: 1, profilePicPath: 1, location: 1 }
    ).exec();
    return users;
  },
  unfollowUser: async (unfollowId, userId) => {
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          following: ObjectId(unfollowId),
        },
      },
      { new: true }
    ).exec();
    if (updatedUser) return updatedUser.following;
  },
  followUser: async (followId, userId) => {
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          following: ObjectId(followId),
        },
      },
      { new: true }
    ).exec();
    if (updatedUser) return updatedUser.following;
  },
  getUsersByIds: async (user_ids) => {
    let users = await User.find(
      { _id: { $in: user_ids } },
      { displayName: 1, username: 1, profilePicPath: 1, location: 1 }
    ).exec();
    return users;
  },
  getUserById: async (user_id) => {
    let user = await User.findById(user_id).exec();
    return user;
  },
  // inActivateUser: async userId => {
  //   await User.updateOne(
  //     { _id: userId },
  //     {
  //       $set: {
  //         isActive: false,
  //         modifiedOn: new Date()
  //       }
  //     }
  //   ).exec();
  // },

  deleteUser: async (userId) => {
    await User.deleteOne({ _id: userId }).exec();
  },
  saveUserDetail: async (user) => {
    await User.updateOne({ _id: user._id }, user).exec();
  },
};

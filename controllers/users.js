var jwt = require("jsonwebtoken");
var User = require("../models/User");
var Post = require("../models/Post");
var ObjectId = require("mongodb").ObjectID;
let queries = require("../queries/user");
let postQueries = require("../queries/post");

module.exports = {
  saveProfileController: async function (req, res, next) {
    let { user, imageURL } = res.locals;
    let { displayName, location, gender, age, username } = req.body;
    console.log(req.body);
    user.displayName = displayName;
    user.username = username;
    user.location = location;
    user.age = age;
    user.gender = gender;
    user.modifiedOn = new Date();
    if (imageURL) user.profilePicPath = imageURL;

    try {
      await queries.saveUserDetail(user);
      res.status(200).json({
        user,
        message: "User profile saved successfully",
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  deleteProfileController: async function (req, res, next) {
    let { user } = res.locals;
    try {
      await queries.deleteUser(user._id);
      res.status(200).json({
        message: "Profile is deleted successfully",
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  followUserController: async function (req, res, next) {
    let { user } = res.locals;
    let { followId } = req.body;
    try {
      let followingIds = await queries.followUser(followId, user._id);
      let followingUsers = await queries.getUsersByIds(followingIds);
      res.status(200).json({ followingUsers: followingUsers });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  unFollowUserController: async function (req, res, next) {
    let { user } = res.locals;
    let { unfollowId } = req.body;
    try {
      let followingIds = await queries.unfollowUser(unfollowId, user._id);
      let followingUsers = await queries.getUsersByIds(followingIds);
      res.status(200).json({ followingUsers: followingUsers });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getFollowersController: async function (req, res, next) {
    let { user } = res.locals;
    try {
      let users = await queries.getFollowers(user);
      res.status(200).json({ users: users });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getFollowingController: async function (req, res, next) {
    let { user } = res.locals;
    try {
      let users = await queries.getFollowingUsers(user);
      res.status(200).json({ followingUsers: users });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getUsersToFollowController: async function (req, res, next) {
    let { user } = res.locals;
    let { numofusers } = req.params;
    try {
      let unfollowingUsers;
      if (isNaN(numofusers))
        unfollowingUsers = await queries.getAllUnfollowingUsers(user);
      else
        unfollowingUsers = await queries.getNUnfollowingUsers(
          user,
          parseInt(numofusers)
        );
      // let unfollowingUsers = await queries.getUsersByIds(unfollowingIds);
      res.status(200).json({ unfollowingUsers: unfollowingUsers });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getUserProfileByIdController: async (req, res, next) => {
    let { userid } = req.params;
    if (!userid) userid = res.locals.user._id;
    let user = (await queries.getUserById(userid)).toObject();
    try {
      var promises = [
        queries.getFollowers(user),
        queries.getFollowingUsers(user),
        postQueries.getPostsByUserId(user._id),
      ];
      let results = await Promise.all(promises);
      user.followers = results[0];
      user.following = results[1];
      user.posts = results[2];
      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
};

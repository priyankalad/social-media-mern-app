var express = require("express");
var multer = require("multer");
var router = express.Router();
var isUserAuthorized = require("../utils/isUserAuthorized");
var isUserExists = require("../models/isUserExists");
var {
  saveProfileController,
  deleteProfileController,
  followUserController,
  unFollowUserController,
  getFollowersController,
  getFollowingController,
  getPostsController,
  getUsersToFollowController,
  getUserProfileByIdController,
} = require("../controllers/users");
var { validateRequest, validationRules, saveImage } = require("../utils/index");
var { userProfileRules } = validationRules;

/**
 * @apiDefine UnauthorizedUserError
 *
 * @apiError UnauthorizedUser-401 User is not authorized
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "User is not authorized"
 *     }
 */

/**
 * @apiDefine InvalidAccessTokenError
 *
 * @apiError InvalidAccessToken-401 Access token is invalid or expired
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Access token is invalid or expired"
 *     }
 */

/**
 * @apiDefine InvalidAccessTokenError
 *
 * @apiError InvalidAccessToken-401 Access token is invalid or expired
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Access token is invalid or expired"
 *     }
 */

/**
 * @apiDefine Header Header
 * @apiHeader {String} authorization Bearer YOUR_ACCESS_TOKEN
 * @apiHeader {String} Content-Type application/json
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Content-Type": "application/json",
 *    "Authorization":"Bearer <YOUR ACCESS TOKEN>"
 *  }
 */

/**
 * @api {get} /user/profile View Profile
 * @apiVersion 1.0.0
 * @apiName View Profile
 * @apiGroup Users
 *
 * @apiUse Header
 *
 * @apiSuccess {Object} user's profile data
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "email":"abc@abc.com",
 *    "name":"Abc",
 *    "location":"Bangalore",
 *    "gender":"male",
 *    "pic_path" :"images/abc_profile_pic.jpg"
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.get(
  "/profile",
  isUserAuthorized,
  isUserExists,
  getUserProfileByIdController
);

/**
 * @api {put} /user/profile Update Profile
 * @apiVersion 1.0.0
 * @apiName Update Profile
 * @apiGroup Users
 
 * @apiParam {String} name User's display name
 * @apiParam {String} location User's Location
 * @apiParam {String} pic_path User's Image path
 * @apiParam {String} gender User's gender
 *
 * @apiExample {json} Body Example:
 *  {
 *    "name":"Abc",
 *    "location":"Bangalore",
 *    "pic_path":"images/abc_profile_pic.jpg",
 *    "gender":"male"
 *  }
 * @apiUse Header
 *
 * @apiSuccess {String} message User profile is updated.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"User profile is updated"
 *  }
 * @apiUse InvalidDataError
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.post(
  "/profile",
  isUserAuthorized,
  isUserExists,
  saveImage("profilePic"),
  validateRequest(userProfileRules),
  //saveImage("../public/profilepics/", "profilepic"),
  saveProfileController
);

/**
 * @api {delete} /user/delete Delete Profile
 * @apiVersion 1.0.0
 * @apiName Delete Profile
 * @apiGroup Users
 *
 * @apiUse Header
 *
 * @apiSuccess {String} message User profile is deleted.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"User profile is deleted"
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.delete(
  "/delete",
  isUserAuthorized,
  isUserExists,
  deleteProfileController
);

/**
 * @api {patch} /user/follow Follow User
 * @apiVersion 1.0.0
 * @apiName Follow User
 * @apiGroup Users
 *
 * @apiParam {String} follow_to Id of the user to follow
 *
 * @apiExample {json} Body Example:
 *  {
 *    "follow_to": Id of the user to follow
 *  }
 *
 * @apiUse Header
 *
 * @apiSuccess {String} message following.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"following"
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.patch("/follow", isUserAuthorized, isUserExists, followUserController);

/**
 * @api {patch} /user/unfollow Unfollow User
 * @apiVersion 1.0.0
 * @apiName Unfollow User
 * @apiGroup Users
 *
 * @apiParam {String} unfollow_to Id of the user to unfollow
 *
 * @apiExample {json} Body Example:
 *  {
 *    "unfollow_to": Id of the user to unfollow
 *  }
 *
 * @apiUse Header
 *
 * @apiSuccess {String} message unfollowing.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"unfollowing",
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.patch(
  "/unfollow",
  isUserAuthorized,
  isUserExists,
  unFollowUserController
);

/**
 * @api {get} /user/followers List of followers
 * @apiVersion 1.0.0
 * @apiName Get Followers
 * @apiGroup Users
 *
 * @apiUse Header
 *
 * @apiSuccess {Array} followers list of followers' ids.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "followers": array of followers' ids
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.get(
  "/followers",
  isUserAuthorized,
  isUserExists,
  getFollowersController
);

/**
 * @api {get} /user/following List of following
 * @apiVersion 1.0.0
 * @apiName Get Following
 * @apiGroup Users
 *
 * @apiUse Header
 *
 * @apiSuccess {Array} following list of user ids being followed by the user.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "following": array of following's ids
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.get(
  "/following",
  isUserAuthorized,
  isUserExists,
  getFollowingController
);

/**
 * @api {get} /user/unfollowing List of unfollowing users
 * @apiVersion 1.0.0
 * @apiName Get Unfollowing
 * @apiGroup Users
 *
 * @apiUse Header
 *
 * @apiSuccess {Array} unfollowing list of user ids for user id.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "following": array of users not being followed by userid
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.get(
  "/unfollowing/:numofusers",
  isUserAuthorized,
  isUserExists,
  getUsersToFollowController
);
module.exports = router;

router.get(
  "/profile/:userid",
  isUserAuthorized,
  isUserExists,
  getUserProfileByIdController
);

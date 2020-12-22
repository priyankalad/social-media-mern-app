let express = require("express");
let router = express.Router();
let {
  createPostController,
  deletePostController,
  toggleLikePostController,
  getPostsController,
  getMyPostsController,
  getMyLikedPostsController,
  createCommentController
} = require("../controllers/posts");
let { validateRequest, validationRules, saveImage } = require("../utils/index");
let { postRules } = validationRules;
let isUserExists = require("../models/isUserExists");
let isUserAuthorized = require("../utils/isUserAuthorized");
/**
 * @api {put} /user/post/create Create Post
 * @apiVersion 1.0.0
 * @apiName Create Post
 * @apiGroup Posts
 
 * @apiParam {String} title Title of the post
 * @apiParam {String} desc Description of the post
 * @apiParam {String} img_url Image path of the post
 *
 * @apiExample {json} Body Example:
 *  {
 *    "title":"New Post",
 *    "desc":"This is new post",
 *    "img_url":"images/posts/post1.jpg"
 *  }
 * @apiUse Header
 *
 * @apiSuccess {String} message Post is created
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"Post is created"
 *  }
 * @apiUse InvalidDataError
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.post(
  "/create",
  isUserAuthorized,
  isUserExists,
  saveImage("postImage"),
  createPostController
);

/**
 * @api {patch} /user/post/toggle-like Toggle like the post
 * @apiVersion 1.0.0
 * @apiName Toggle like
 * @apiGroup Posts
 
 * @apiParam {String} title Title of the post
 * @apiParam {String} desc Description of the post
 * @apiParam {String} img_url Image path of the post
 *
 * @apiExample {json} Body Example:
 *  {
 *    "post_id":Id of the post
 *  }
 * @apiUse Header
 *
 * @apiSuccess {String} message toggle like successful
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"toggle like successful"
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */
router.patch(
  "/toggle-like/:post_id",
  isUserAuthorized,
  isUserExists,
  toggleLikePostController
);

/**
 * @api {delete} /user/post/delete Delete Post
 * @apiVersion 1.0.0
 * @apiName Delete posts
 * @apiGroup Posts
 
 * @apiParam {String} post_id Id of the post
 * @apiParam {String} comment Comment
 *
 * @apiExample {json} Body Example:
 *  {
 *    "post_id":Id of the post,
 *    "comment":"This is a new comment"
 *  }
 * @apiUse Header
 *
 * @apiSuccess {String} message comment is created
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"comment is created"
 *  }
 * @apiUse InvalidDataError
 * @apiUse InvalidUserError
 * @apiUse InvalidAccessTokenError
 * @apiUse UnauthorizedUserError
 */

router.delete("/delete", isUserAuthorized, isUserExists, deletePostController);

router.put(
  "/toggle-like",
  isUserAuthorized,
  isUserExists,
  toggleLikePostController
);

router.get("/", isUserAuthorized, isUserExists, getPostsController);
router.get("/myposts", isUserAuthorized, isUserExists, getMyPostsController);
router.get(
  "/mylikedposts",
  isUserAuthorized,
  isUserExists,
  getMyLikedPostsController
);

router.post(
  "/comment",
  isUserAuthorized,
  isUserExists,
  createCommentController
);

module.exports = router;

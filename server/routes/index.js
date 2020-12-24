var express = require("express");
var router = express.Router();
let {
  registerController,
  accountVerificationController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/index");
let { validateRequest, validationRules } = require("../utils/index");
let {
  loginRules,
  registerRules,
  forgotPasswordRules,
  resetPasswordRules,
} = validationRules;

/**
 * @apiDefine InvalidDataError
 *
 * @apiError InvalidData-422 Provided data are invalid
 *
 * @apiErrorExample Error-Response 422:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "error": "Provided data are invalid"
 *     }
 */

/**
 * @apiDefine InvalidUserError
 *
 * @apiError InvalidUser-404 User not found
 *
 * @apiErrorExample Error-Response 404:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */

/**
 * @apiDefine InvalidCodeError
 * @apiError InvalidCode-422 Code is invalid or expired
 * @apiErrorExample Error-Response 422:
 *     HTTP/1.1 422 Unauthorized
 *     {
 *       "error": "Code is invalid or expired"
 *     }
 */

/**
 * @api {post} /register New Registration
 * @apiVersion 1.0.0
 * @apiName Registration
 * @apiGroup Index
 *
 * @apiParam {String} email User's unique Email address.
 * @apiParam {String} name User's display name
 * @apiParam {String} password User's password
 * @apiParam {String} confirmPassword User's confirm password to be compared with password
 *
 * @apiExample {json} Body Example:
 *  {
 *    "email":"abc@abc.com",
 *    "name":"Abc",
 *    "password":"password123",
 *    "confirmPassword":"password123"
 *  }
 *
 * @apiSuccess {String} message Registration is successful.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"Registration is successful"
 *  }
 * @apiUse InvalidDataError
 */
router.post("/register", validateRequest(registerRules), registerController);

/**
 * @api {get} /verify-account/:code Account Verification
 * @apiVersion 1.0.0
 * @apiName Account Verification
 * @apiGroup Index
 *
 *
 * @apiSuccess {String} message Account verification is successful.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"Account verification is successful"
 *  }
 *
 * @apiUse InvalidCodeError
 */
router.get("/verify-account/:code", accountVerificationController);

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Index
 *
 * @apiParam {String} email User's unique Email address.
 * @apiParam {String} password User's password
 *
 * @apiExample {json} Body Example:
 *  {
 *    "email":"abc@abc.com",
 *    "password":"password123"
 *  }
 *
 * @apiSuccess {String} message Login successful.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"Login successful",
 *    "data":{
 *      "username":"Abc"
 *    },
 *    "token":<GENERATED ACCESS TOKEN>
 *  }
 * @apiUse InvalidDataError
 *
 * @apiError InvalidUser Invalid email or password
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Invalid email or password",
 *       "data":{}
 *     }
 */
router.post("/login", validateRequest(loginRules), loginController);

/**
 * @api {put} /forgot-password Forgot Password
 * @apiVersion 1.0.0
 * @apiName Forgot Password
 * @apiGroup Index
 *
 * @apiParam {String} email User's unique Email address.
 *
 * @apiExample {json} Body Example
 *  {
 *    "email":"abc@abc.com"
 *  }
 *
 * @apiSuccess {String} message Password Reset code is sent to email address
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"Password Reset code is sent to email address"
 *  }
 * @apiUse InvalidUserError
 * @apiUse InvalidDataError
 *
 */
router.put(
  "/forgot-password",
  validateRequest(forgotPasswordRules),
  forgotPasswordController
);

/**
 * @api {put} /reset-password/:code Reset Password
 * @apiVersion 1.0.0
 * @apiName Reset Password
 * @apiGroup Index
 *
 * @apiParam {String} password User's password
 * @apiParam {String} confirmPassword User's confirm password to be compared with password
 *
 * @apiExample {json} Body Example
 *  {
 *    "password":"password123",
 *    "confirmPassword":"password123"
 *  }
 *
 * @apiSuccess {String} message Password is reset.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message":"Password is reset"
 *  }
 * @apiUse InvalidDataError
 * @apiUse InvalidCodeError
 */
router.put(
  "/reset-password",
  validateRequest(resetPasswordRules),
  resetPasswordController
);
module.exports = router;

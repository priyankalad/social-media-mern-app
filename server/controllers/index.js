let User = require("../models/User");
let sendMail = require("../utils/sendMail");
let randomstring = require("randomstring");
let jwt = require("jsonwebtoken");
const config = require("../config.json");
let isEmailEnable = config.ENABLE_EMAIL == "true";
let queries = require("../queries/index");

module.exports = {
  registerController: async (req, res, next) => {
    let { username } = req.body;
    try {
      let user = await queries.findUserByUsername(username);
      if (user) {
        return res.status(409).json({
          message: "Username is taken",
        });
      }
      let randomCode = randomstring.generate({
        length: 8,
        charset: "alphanumeric",
        capitalization: "uppercase",
      });
      let randomCode2 = randomstring.generate({
        length: 5,
        charset: "numeric",
      });
      let verificationCode = `${randomCode}.${Date.now()}`;

      let newUser = {
        ...req.body,
        // username: `@${req.body.displayName
        //   .split(" ")[0]
        //   .substring(0, 5)
        //   .toLowerCase()}${randomCode2}`,
        isVerified: isEmailEnable ? false : true,
        verificationCode: isEmailEnable ? verificationCode : "",
        createdOn: new Date(),
        modifiedOn: new Date(),
      };

      let result = await queries.createUser(newUser);
      res.status(201).json({
        message: "User registration is successful",
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  // if (isEmailEnable) {
  //   let verificationLink =
  //     (process.env.ENV === "production"
  //       ? process.env.UI_CLIENT_URL
  //       : process.env.DEV_UI_CLIENT_URL) +
  //     "/verifyaccount/" +
  //     verificationCode;
  //   sendMail(
  //     {
  //       from: process.env.SMTP_FROM_MAIL,
  //       to: req.body.email,
  //       subject: "Account Verification",
  //       html:
  //         "<p>Dear " +
  //         req.body.displayName +
  //         "</p><br/><br/><p>Please click below link to verify your account</p><br/><a href=" +
  //         verificationLink +
  //         " target='_blank'>Verification Link</a>"
  //     },
  //     function(err, info) {
  //       if (err) return next(err);
  //       res.status(201).json({
  //         message:
  //           "User registration is successful.\n Please check your registered email to verify the account"
  //       });
  //       console.log("Mail sent: " + info);
  //     }
  //   );
  // } else {
  //   res.status(201).json({
  //     message: "User registration is successful"
  //   });
  // }

  accountVerificationController: async function (req, res, next) {
    let { code } = req.params;
    let [, date] = code.split(".");
    try {
      let user = await queries.updateUserVerification(code);
      if (!user) {
        return res.status(422).json({
          message: "Verification code is invalid or expired",
        });
      }
      let hours_diff = Math.floor(
        (new Date().getTime() - new Date(Number(date)).getTime()) /
          (60 * 60 * 1000)
      );
      if (hours_diff > 12) {
        return res.status(422).json({
          message: "Verification code is invalid or expired",
        });
      }
      return res.status(200).json({
        message: "Account verification is done successfully",
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  loginController: async function (req, res, next) {
    let { username } = req.body;
    try {
      let user = await queries.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          message: "User is either not found or not verified",
        });
      }

      let isMatch = await user.comparePasswords(req.body.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Username or Password",
        });
      }

      return res.status(200).json({
        user: user,
        token: jwt.sign(
          { id: user._id, username: user.username },
          config.JWT_SECRET,
          { expiresIn: "2 days" }
        ),
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  forgotPasswordController: async function (req, res, next) {
    let { username } = req.body;
    try {
      let user = await queries.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          message: "User is either not found or not verified",
        });
      }
      res.status(200).json({
        username: username,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  resetPasswordController: async function (req, res, next) {
    let { username, password } = req.body;
    if (!username)
      return res
        .status(400)
        .json({ message: "Please provide username to reset the password" });
    try {
      let user = await queries.findUserByUsername(username);
      if (!user)
        return res.status(400).json({
          message: "Invalid Username",
        });
      user.password = password;
      user.modifiedOn = new Date();
      let updatedUser = await queries.updateUser(user);
      return res.status(200).json({
        message: "Password is reset successfully",
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
};

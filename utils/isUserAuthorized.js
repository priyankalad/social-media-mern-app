var jwt = require("jsonwebtoken");
const config = require("../config.json");
module.exports = function (req, res, next) {
  let { authorization } = req.headers;

  let token = authorization && authorization.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      message: "User is not authorized",
    });
  }

  jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log("oops.. error has ocured");
      console.log(err);
      return res.status(403).json({
        message: "Access token is invalid or expired",
      });
    }
    console.log(decoded);
    let { id, iat } = decoded;
    console.log("iat: " + iat);
    console.log("Date.now: " + Date.now());
    res.locals.user_id = id;
    return next();
  });
};

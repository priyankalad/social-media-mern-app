var User = require("./User");
module.exports = function(req, res, next) {
  User.findOne(
    {
      _id: res.locals.user_id,
      isActive: true
    },
    (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.status(422).json({
          message: "User not found"
        });
      }
      res.locals.user = user;
      return next();
    }
  );
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  //email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, default: "" },
  gender: { type: String, default: "" },
  age: { type: Number },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String, default: "" },
  resetCode: { type: String, default: "" },
  createdOn: { type: Date, required: true, default: Date.now },
  modifiedOn: { type: Date, required: true },
  profilePicPath: { type: String, default: "" },
  following: { type: Array, default: [] },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.password) return next();
  bcrypt.hash(user.password, 10, (err, encryptedPassword) => {
    if (err) return next(err);
    user.password = encryptedPassword;
    user.resetCode = "";
    next();
  });
});

userSchema.methods.comparePasswords = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

let User = require("../models/User");

module.exports = {
  findUserByUsername: async username => {
    let user = await User.findOne({
      username: username.toLowerCase(),
      isVerified: true,
      isActive: true
    }).exec();
    return user;
  },

  createUser: async user => {
    let newUser = await User.create(user);
    return newUser;
  },

  updateUser: async user => {
    return await user.save();
  },

  updateUserVerification: async verificationCode => {
    let updatedUser = await User.findOneAndUpdate(
      {
        verificationCode: verificationCode
      },
      {
        $set: {
          isVerified: true,
          verificationCode: ""
        }
      }
    ).exec();
    return updatedUser;
  },

  updateResetCode: async (userId, resetCode) => {
    let result = await User.updateOne(
      {
        _id: userId
      },
      {
        $set: {
          resetCode: resetCode
        }
      }
    ).exec();
    return result;
  },
  verifyResetCode: async (userId, resetCode) => {
    let query = {
      _id: userId,
      isVerified: true,
      isActive: true,
      resetCode: resetCode
    };
    let user = await User.findOne(query);
    return user;
  }
};

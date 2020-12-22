const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  postImageUrl: { type: String, default: "" },
  postedBy: {
    id: String,
    username: String,
    displayName: String,
    profilePicPath: String
  },
  likedByUsers: { type: Array, default: [] },
  comments: [
    {
      commentedBy: {
        id: String,
        username: String,
        displayName: String,
        profilePicPath: String
      },
      postId: { type: String, required: true },
      comment: { type: String, required: true },
      commentedOn: { type: Date, default: Date.now }
    }
  ],
  postedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);

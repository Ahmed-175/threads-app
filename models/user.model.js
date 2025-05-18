import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: [mongoose.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  groups: {
    type: [mongoose.Types.ObjectId],
    ref: "Group",
    default: [],
  },
  Liked: {
    type: [mongoose.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  avatar: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    default: [],
    raf: "User",
  },
  followings: {
    type: [mongoose.Types.ObjectId],
    default: [],
    raf: "User",
  },
});

const User = mongoose.model("User", userSchema);
export default User;

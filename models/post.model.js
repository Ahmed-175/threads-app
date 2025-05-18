import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
      raf: "User",
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      default: [],
      raf: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

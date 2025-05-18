import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

const deletePost = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    // Validate required fields
    if (!user_id || !post_id) {
      return res.status(400).json({
        message: "Missing required fields: user_id or post_id",
      });
    }

    // Check if user exists
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Check if post exists
    const existingPost = await Post.findById(post_id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post does not exist." });
    }

    // Check if the post belongs to the user
    if (existingPost.user_id.toString() !== user_id) {
      return res.status(403).json({
        message: "You do not have permission to delete this post.",
      });
    }

    // Delete the post
    await existingPost.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
      post: existingPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      message: "Server error while deleting the post.",
      error: error.message,
    });
  }
};

export default deletePost;

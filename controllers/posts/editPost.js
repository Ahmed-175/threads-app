// controllers/post.controller.js
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

/**
 * @desc Edit an existing post
 * @route PATCH /api/posts/:post_id
 * @access Private
 */
const editPost = async (req, res) => {
  try {
    const { user_id, post_id, newText } = req.body;

    // Validate required fields
    if (!user_id || !post_id || !newText) {
      return res
        .status(400)
        .json({ message: "Missing required fields: user_id, post_id, or newText." });
    }

    // Find the post and user
    const existingPost = await Post.findById(post_id);
    const existingUser = await User.findById(user_id);

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    if (!existingPost) {
      return res.status(404).json({ message: "Post does not exist." });
    }

    // Check post ownership
    if (existingPost.user_id.toString() !== user_id) {
      return res.status(403).json({ message: "You do not have permission to update this post." });
    }

    // Update the post
    existingPost.text = newText;
    await existingPost.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      post: existingPost,
    });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({
      message: "Server error while editing the post.",
      error: error.message,
    });
  }
};

export default editPost;

// controllers/post.controller.js
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

/**
 * @desc Create a new post for a given user
 * @route POST /api/posts
 * @access Private
 */
const createPost = async (req, res) => {
  try {
    const { user_id, text } = req.body;

    // Validate required fields
    if (!user_id || !text) {
      return res
        .status(400)
        .json({ message: "Missing required fields: user_id and text." });
    }

    // Check if user exists
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Create and save the new post
    const newPost = await Post.create({
      user_id,
      text,
    });

    // Respond with the created post
    return res.status(201).json({
      message: "Post created successfully.",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      message: "Server error while creating post.",
      error: error.message,
    });
  }
};

export default createPost;

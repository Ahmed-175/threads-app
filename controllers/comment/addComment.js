import User from "../../models/user.model.js";
import Post from "../../models/post.model.js";
import Comment from "../../models/comment.model.js"; // Assuming this model exists

const addComment = async (req, res) => {
  try {
    const { comment, user_id, post_id } = req.body;

    // Validate required fields
    if (!comment || !user_id || !post_id) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the post exists
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Create the new comment
    const newComment = new Comment({
      text: comment,
      user_id,
      post_id,
    });

    await newComment.save();

    // Add the comment to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment", error);
    return res.status(500).json({
      message: "Server error while adding comment.",
      error: error.message,
    });
  }
};

export default addComment;

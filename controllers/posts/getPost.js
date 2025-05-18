import Post from "../../models/post.model.js";

const getPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    // Validate post_id
    if (!post_id) {
      return res.status(400).json({ message: "Post ID is required." });
    }

    // Find the post and populate related fields
    const post = await Post.findById(post_id)
      .populate("user_id", "-password") // Exclude sensitive fields if needed
      .populate("likes", "-password") // Assuming 'likes' are user references
      .populate({
        path: "comments",
        populate: { path: "user_id", select: "-password" },
      });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post does not exist." });
    }

    // Return the post data
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error retrieving post:", error);
    return res.status(500).json({
      message: "Server error while retrieving the post.",
      error: error.message,
    });
  }
};

export default getPost;

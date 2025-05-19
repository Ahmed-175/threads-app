import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { user_id } = req.body;

        // Validate input
        if (!postId || !user_id) {
            return res.status(400).json({
                success: false,
                message: "Post ID and User ID are required"
            });
        }

        // Check if user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Check if user already liked the post
        const isLiked = post.likes.includes(user_id);

        if (isLiked) {
            // Unlike the post
            post.likes = post.likes.filter(id => id.toString() !== user_id);
            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post unliked successfully",
                likes: post.likes
            });
        } else {
            // Like the post
            post.likes.push(user_id);
            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post liked successfully",
                likes: post.likes
            });
        }

    } catch (error) {
        console.error("Error in likePost:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default likePost;
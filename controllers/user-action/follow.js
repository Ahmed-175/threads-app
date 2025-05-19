import User from "../../models/user.model.js";

const follow = async (req, res) => {
  try {
    const { user_id, user_follower_id } = req.body;

    // Validate input
    if (!user_id || !user_follower_id) {
      return res.status(400).json({
        success: false,
        message: "User ID and Follower ID are required",
      });
    }

    // Check if users exist
    const [user, follower] = await Promise.all([
      User.findById(user_id),
      User.findById(user_follower_id),
    ]);

    if (!user || !follower) {
      return res.status(404).json({
        success: false,
        message: "User or follower not found",
      });
    }

    // Check if already following
    const isFollowing = user.followings.includes(user_follower_id);

    if (isFollowing) {
      // Unfollow
      user.followings = user.followings.filter(
        (id) => id.toString() !== user_follower_id
      );
      follower.followers = follower.followers.filter(
        (id) => id.toString() !== user_id
      );
    } else {
      // Follow
      user.followings.push(user_follower_id);
      follower.followers.push(user_id);
    }

    // Save both users
    await Promise.all([user.save(), follower.save()]);

    return res.status(200).json({
      success: true,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    });
  } catch (error) {
    console.error("Error in follow:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default follow;

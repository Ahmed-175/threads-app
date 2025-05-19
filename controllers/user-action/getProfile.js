import User from "../../models/user.model.js";

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate({
        path: "posts",
        populate: [
          {
            path: "comments",
            model: "Comment",
            populate: {
              path: "user_id",
              model: "User",
              select: " _id name avatar ",
            },
          },
        ],
      })
      .populate({
        path: "followers",
        options: { strictPopulate: false },
      })
      .populate({
        path: "following",
        options: { strictPopulate: false },
      })
      .select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("error in getProfile", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getProfile;

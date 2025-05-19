import express from "express";
import getProfile from "../controllers/user-action/getProfile.js";
import likePost from "../controllers/user-action/likePost.js";
import follow from "../controllers/user-action/follow.js";

const router = express.Router();

router.get("/get-profile/:userId", getProfile);
router.patch("/like-post/:postId", likePost);
router.patch("/follow", follow);

// router.patch("/unfollow", follow);

export default router;

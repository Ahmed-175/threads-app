import express from "express";
import createPost from "../controllers/posts/createPost.js";
import editPost from "../controllers/posts/editPost.js";
import deletePost from "../controllers/posts/deletePost.js";
import getPost from "../controllers/posts/getPost.js";

const router = express.Router();

router.post("/create-post", createPost);
router.patch("/edit-post", editPost);
router.delete("/delete-post", deletePost);
router.get("/get-post/:post_id", getPost);

export default router;

import express from "express";
import signUp from "../controllers/auth/sign-up.js";
import signIn from "../controllers/auth/sign-in.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);


// router.post("/logout")

export default router;

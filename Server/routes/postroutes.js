import express from "express";
import {
  createPost,
  getPosts,
  updateposts,
  getsinglePosts,
  deletePosts,
} from "../controllers/postControllers.js";

const router = express.Router();
router.get("/posts", getPosts);
router.post("/createpost", createPost);
router.get("/post/:id", getsinglePosts);
router.put("/updatepost/:id", updateposts);
router.delete("/deletepost/:id", deletePosts);
export default router;

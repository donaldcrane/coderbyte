import { Router } from "express";
import PostController from "../controllers/post";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  addPost, likePost, getPostById, getPosts, deletePost, updatePost
} = PostController;

router.get("/posts", verifyToken, getPosts);
router.get("/post/:id", verifyToken, getPostById);

router.post("/post", verifyToken, addPost);

router.patch("/like-post/:id", verifyToken, likePost);
router.patch("/post/:id", verifyToken, updatePost);

router.delete("/post/:id", verifyToken, deletePost);

export default router;

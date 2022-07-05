import express from "express";
import PostController from "../conroller/postController.js";
import authenticationMiddleware from "../middlewares/authentication_middleware.js";
const router = express.Router();
const postController = new PostController();
router.get("/post?:id?:name", postController.getPost);
router.post("/createPost", postController.createPost);
router.post("/updatePost", postController.updatePost);
router.get("/getAll", authenticationMiddleware, postController.getAllPost);
router.get(
  "/get?:category_id",
  authenticationMiddleware,
  postController.getPostPerCategory
);

export default router;

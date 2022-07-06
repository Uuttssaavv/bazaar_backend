import express from "express";
import CategoryController from "../conroller/categoryController.js";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/create", categoryController.createCategory);
router.get("/getAllCategories", categoryController.getAllCategories);

export default router;

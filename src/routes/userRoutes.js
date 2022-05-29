import express from "express";
import UserController from "../conroller/userController.js";
const router = express.Router();
const userController = new UserController();
router.get("/get", userController.getUser);
router.get("/get/:id", userController.getUser);
router.post("/login", userController.login);

router.get("/getAll", userController.getAllUsers);
router.post("/create", userController.createUser);

export default router;

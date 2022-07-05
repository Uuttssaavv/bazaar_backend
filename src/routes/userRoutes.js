import express from "express";
import UserController from "../conroller/userController.js";
import signupMiddleware from "../middlewares/user/signup_middleware.js";
import loginMiddleware from "../middlewares/user/login_middleware.js";
// import authenticationMiddleware from "../middlewares/authentication_middleware.js";
const router = express.Router();
const userController = new UserController();
router.post("/login", loginMiddleware, userController.login);

router.post("/create", signupMiddleware, userController.register);

export default router;

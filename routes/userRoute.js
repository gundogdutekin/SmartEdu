import express from 'express';
import { createUser, loginUser, logoutUser,getDashboardPage } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route('/signup').post(createUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logoutUser);
userRouter.route('/dashboard').get(authMiddleware,getDashboardPage);

export { userRouter };
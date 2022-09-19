import express from 'express';
import { createUser, loginUser, logoutUser } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.route('/signup').post(createUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logoutUser);

export { userRouter };
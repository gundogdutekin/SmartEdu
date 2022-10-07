import express from 'express';
import { getIndexPage, getAboutPage, getRegisterPage, getLoginPage } from '../controllers/pageController.js';
import redirectMiddleware from "../middlewares/redirectMiddleware.js";

const pageRouter = express.Router();

pageRouter.route('/').get(getIndexPage);
pageRouter.route('/about').get(getAboutPage);
pageRouter.route('/register').get(redirectMiddleware,getRegisterPage);
pageRouter.route('/login').get(getLoginPage);

export { pageRouter };
import express from 'express';
import { getIndexPage, getAboutPage, getRegisterPage, getLoginPage } from '../controllers/pageController.js';

const pageRouter = express.Router();

pageRouter.route('/').get(getIndexPage);
pageRouter.route('/about').get(getAboutPage);
pageRouter.route('/register').get(getRegisterPage);
pageRouter.route('/login').get(getLoginPage);

export { pageRouter };
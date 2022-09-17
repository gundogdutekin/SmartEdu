import express from 'express';
import { getIndexPage, getAboutPage } from '../controllers/pageController.js';

const pageRouter = express.Router();

pageRouter.route('/').get(getIndexPage);
pageRouter.route('/about').get(getAboutPage);

export { pageRouter };
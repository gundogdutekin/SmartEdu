import express from 'express';
import { creatCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.route('/').post(creatCategory);

export { categoryRouter };
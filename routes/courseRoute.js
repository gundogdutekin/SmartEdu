import express from 'express';
import {
    creatCourse,
    getAllCourses,
    getCourse,
} from '../controllers/courseController.js';

import roleMiddleware from "../middlewares/roleMiddleware.js";

const courseRouter = express.Router();

courseRouter.route('/').post(roleMiddleware(["teacher","admin"]),creatCourse);
courseRouter.route('/').get(getAllCourses);
courseRouter.route('/:slug').get(getCourse);
export { courseRouter };
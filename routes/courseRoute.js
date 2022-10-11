import express from 'express';
import {
    creatCourse,
    getAllCourses,
    getCourse,
    courseEnroll
} from '../controllers/courseController.js';

import roleMiddleware from "../middlewares/roleMiddleware.js";

const courseRouter = express.Router();

courseRouter.route('/').post(roleMiddleware(["teacher","admin"]),creatCourse);
courseRouter.route('/').get(getAllCourses);
courseRouter.route('/:slug').get(getCourse);
courseRouter.route('/enroll').post(courseEnroll);
export { courseRouter };
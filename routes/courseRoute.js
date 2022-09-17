import express from 'express';
import {
    creatCourse,
    getAllCourses,
    getCourse,
} from '../controllers/courseController.js';

const courseRouter = express.Router();

courseRouter.route('/').post(creatCourse);
courseRouter.route('/').get(getAllCourses);
courseRouter.route('/:slug').get(getCourse);
export { courseRouter };
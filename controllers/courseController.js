import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';

const creatCourse = async(req, res) => {
    try {
        const course = await Course.create(req.body);

        res.status(201).json({
            status: 'success',
            course: course,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error,
        });
    }
};
const getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find();
        const categories = await Category.find();
        res.status(200).render('courses', {
            courses: courses,
            categories: categories,
            page_name: 'courses',
        });
        /*  res.status(200).json({
                                                                                status: 'success',
                                                                                courses: courses,
                                                                            }); */
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error,
        });
    }
};
const getCourse = async(req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        res.status(200).render('course', {
            course: course,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error,
        });
    }
};

export { creatCourse, getAllCourses, getCourse };
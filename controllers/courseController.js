import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';

const creatCourse = async(req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).redirect('/courses');
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error,
        });
    }
};
const getAllCourses = async(req, res) => {
    try {
        const categorySlug = req.query.category;
        console.log(categorySlug);
        const category = await Category.findOne({ slug: categorySlug });
        let filter = {};
        if (categorySlug) {
            filter = { category: category._id };
        }

        const courses = await Course.find(filter);

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
        console.dir(req.path)
        const categories = await Category.find();
        res.status(200).render('course', {
            course: course,
            categories: categories,
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
import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';
import {User} from '../models/User.js';


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
        
        const category = await Category.findOne({ slug: categorySlug });
        let filter = {};
        if (categorySlug) {
            filter = { category: category._id };
        }

        const courses = await Course.find(filter).populate('user').sort('-createdAt');
    
        const categories = await Category.find();
        res.status(200).render('courses', {
            courses: courses,
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
const getCourse = async(req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');
    
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
const courseEnroll = async(req, res) => {
    try {
       const id=req.session.userID;
       const user=await User.findById(id);
       user.courses.push({ _id: req.body.courseId });
       await user.save();
       
       res.status(200).redirect('/users/dashboard');
    }catch(error){
        res.status(400).json({
            status: "fail",
            error: error
        })
    }
} 

export { creatCourse, getAllCourses, getCourse,courseEnroll };
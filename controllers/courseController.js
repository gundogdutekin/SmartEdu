import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';
import { User } from '../models/User.js';

const creatCourse = async (req, res) => {
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
const getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.category;
    
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
     let newCourses = await Course.find(filter).populate('user')
      .sort('-createdAt');
    if(typeof req.session.userID !== "undefined"){
      const user=await User.findById(req.session.userID)
      const coursess = await Course.find(filter).populate('user').sort('-createdAt');
      newCourses=coursess.filter(course=>user.courses.indexOf(course.id)===-1) 
    }
    
    const categories = await Category.find();
    res.status(200).render('courses', {
      courses: newCourses,
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
const getCourse = async (req, res) => {
  try {

    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    let isEnroll=false
    if(typeof req.session.userID !== "undefined"){
      const user=await User.findById(req.session.userID)
      isEnroll=user.courses.indexOf(course.id)===-1 ? false:true
    }

    const categories = await Category.find();
    res.status(200).render('course', {
      course: course,
      categories: categories,
      page_name: 'courses',
      isEnroll:isEnroll,
      messages: req.flash('error'),
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};
const courseEnroll = async (req, res) => {
  try {
    const id = req.session.userID;
    const user = await User.findById(id);
    const inArray = user.courses.includes(req.body.courseId);
    if (!inArray) {
      const arrayUpdate = () => {
        user.courses.push({ _id: req.body.courseId });
      };
      await arrayUpdate();
      await user.save();
      res.status(200).redirect('/users/dashboard');
    } else {
      req.flash('error', 'Bu kursa zaten kayıt oldunuz');
      res.status(200).redirect('back');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

export { creatCourse, getAllCourses, getCourse, courseEnroll };

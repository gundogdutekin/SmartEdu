import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { Course } from '../models/Course.js';
import bcrypt from 'bcrypt';


const createUser = async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error
        })
    }

}
const loginUser = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            error: "Email or password is not entered"
        })
    } else {
        try {
            const user = await User.findOne({ email: email })
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        //SESSİON START
                        req.session.userID = user._id;

                        res.status(200).redirect('/users/dashboard');
                    } else {
                        res.status(400).send("Şifre Hatalı");
                    }
                });
            } else {
                res.status(400).json({
                    status: "fail",
                    error: 'Bu emaile sahip bir kullanıcı yok'
                })
            }

        } catch (error) {
            res.status(400).json({
                status: "fail",
                error: error
            })
        }
    }
}
const logoutUser = (req, res) => {
    req.session.destroy((err) => {  
        if(err) {
            return console.log(err);
        }else{
            res.redirect('/');
        }})
    
}
const getDashboardPage = async(req, res) => {
    const id=req.session.userID;
    const user=await User.findById(id);
    const courses=await Course.find({user:id});
    const categories = await Category.find();
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user:user,
        categories: categories,
        courses:courses
    })
    
}
export { createUser, loginUser, logoutUser,getDashboardPage }
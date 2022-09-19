import { User } from "../models/User.js";
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

                        res.status(200).redirect('/');
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
    req.session.destroy();
    res.redirect('/');
}
export { createUser, loginUser, logoutUser }
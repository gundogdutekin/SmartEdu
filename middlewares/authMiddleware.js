import { User } from '../models/User.js';

const authMiddleware = (req, res, next) => {
  User.findById(req.session.userID, (error, user) => {
    if (error || !user) return res.redirect('/login'); 
    next();
  });
};

export default authMiddleware;

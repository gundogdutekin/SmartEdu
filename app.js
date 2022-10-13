import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import ejs from 'ejs';
import { pageRouter } from './routes/pageRoute.js';
import { courseRouter } from './routes/courseRoute.js';
import { categoryRouter } from './routes/categoryRoute.js';
import { userRouter } from './routes/userRoute.js';



const app = express();

//Connect DB
const dbURL = 'mongodb://localhost/smartedu-db';
mongoose
    .connect(dbURL)
    .then(() => {
        console.log('DB CONNECTED SUCCESSFULLY');
    })
    .catch((err) => {
        console.log('ERROR! NOT CONNECTED DB');
    });

//Template Engine "EJS" Set
app.set('view engine', 'ejs');
//Global Variable Set
global.userIN = null;
//MIDDLEWARES
//Session Middleware
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: dbURL })
    }))
//Flash Middleware
app.use(flash());
//Static Files Middleware
app.use(express.static('public'));
//Post Request Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//ROUTES
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
})
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
});
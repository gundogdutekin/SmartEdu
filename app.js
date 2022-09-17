import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';
import { pageRouter } from './routes/pageRoute.js';
import { courseRouter } from './routes/courseRoute.js';
import { categoryRouter } from './routes/categoryRoute.js';

const app = express();

//Connect DB
mongoose
    .connect('mongodb://localhost/smartedu-db')
    .then(() => {
        console.log('DB CONNECTED SUCCESSFULLY');
    })
    .catch((err) => {
        console.log('ERROR! NOT CONNECTED DB');
    });

//Template Engine "EJS" Set
app.set('view engine', 'ejs');
//MIDDLEWARES
//Static Files Middleware
app.use(express.static('public'));
//Post Request Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//ROUTES
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
});
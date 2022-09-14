import express from 'express';
import ejs from 'ejs';

const app = express();

//Template Engine "EJS" Set
app.set('view engine', 'ejs');
//MIDDLEWARES
//Static Files Middleware
app.use(express.static('public'));
//ROUTES
app.get('/', (req, res) => {
    res.status(200).render('index', {
        page_name: 'index',
    });
});
app.get('/about', (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
});
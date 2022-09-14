import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('merhaba');
});

app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
});
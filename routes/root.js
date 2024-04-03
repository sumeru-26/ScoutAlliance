import express from 'express';

const rootRoute = express.Router();

rootRoute.get('/', (req, res) => {
    res.render('home');
});

export default rootRoute;
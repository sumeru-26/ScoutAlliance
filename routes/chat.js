import express from 'express';

const chatRoute = express.Router();

chatRoute.get('/', (req, res) => {
    res.render("chat/chat");
});

export default chatRoute;
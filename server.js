import 'dotenv/config'

import { createServer } from 'node:http';

import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import rootRoute from './routes/root.js';
import infoRoute from './routes/info.js';
import chatRoute from './routes/chat.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('view engine', 'hbs');
app.set('views', './views');

app.engine('hbs', engine({
    extname: 'hbs'
}));

app.use('/', rootRoute);
app.use('/info', infoRoute);
app.use('/chat', chatRoute)


io.on('connection', (socket) =>{
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server is currently running on port ${port}`);
});
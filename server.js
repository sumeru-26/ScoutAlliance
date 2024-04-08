import 'dotenv/config'

import express from 'express';
import { engine } from 'express-handlebars';

import rootRoute from './routes/root.js';
import infoRoute from './routes/info.js';
import chatRoute from './routes/chat.js';

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('views', './views');

app.use('/', rootRoute);
app.use('/info', infoRoute);
app.use('/chat', chatRoute)

const port = process.env.PORT || 3000;
app.listen(port);
import express from 'express';
import { createServer } from 'node:http';
import { engine } from 'express-handlebars';

import rootRoute from './routes/root.js';

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('views', './views');

app.use('/', rootRoute);

const port = process.env.PORT || 3000;
app.listen(port);
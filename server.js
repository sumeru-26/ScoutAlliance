import 'dotenv/config'

import { createServer } from 'node:http';

import express from 'express';
import { engine } from 'express-handlebars';

import rootRoute from './routes/root.js';
import infoRoute from './routes/info.js';
import entriesRoute from './routes/entries.js';

const app = express();
const server = createServer(app);

app.set('view engine', 'hbs');
app.set('views', './views');

app.engine('hbs', engine({
    extname: 'hbs'
}));

app.use('/', rootRoute);
app.use('/info', infoRoute);
app.use('/entries', entriesRoute)

const port = process.env.PORT || 3000;
app.listen(port);
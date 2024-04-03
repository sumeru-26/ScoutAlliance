import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rootRoute = express.Router();


const __dirname = dirname(fileURLToPath(import.meta.url));
const STATICS_PATH = join(__dirname, '..', 'static');


rootRoute.get('/', (req, res) => {
    res.sendFile(join(STATICS_PATH, 'index.html'));
});

export default rootRoute;
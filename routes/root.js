import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rootRoute = express.Router();

const __dirname = dirname(join(process.cwd(),'ScoutAlliance/'));

rootRoute.get('/', (req, res) => {
    res.sendFile(join(__dirname, './static/index.html'));
});

export default rootRoute;
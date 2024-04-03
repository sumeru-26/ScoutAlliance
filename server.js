import express from 'express';
import { createServer } from 'node:http';
import rootRoute from './routes/root.js';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

console.log(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);

app.use('/', rootRoute);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
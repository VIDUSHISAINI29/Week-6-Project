import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import routes from './src/routes/index.js'
import { connectDb } from './src/config/db.js';
import {app, server} from "./src/config/socket.js"
// const app = express();

const port = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_URL, // React app URL (adjust if different)
  credentials: true,  // if you want to send cookies or auth headers
}));

app.use(bodyParser.json({limit : '100mb'}));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use('/api',routes);

connectDb().then(() => {
    server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
})

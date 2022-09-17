import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import authRouter from './routes/auth.routes.js';

config();

const app = express();

app.use(express.json());

app.use('/api', authRouter);

mongoose.connect(process.env.DB_URI, () => {
	app.listen(8000);
});

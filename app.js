import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/event.routes.js';
import userRouter from './routes/user.routes.js';
import deserializeUser from './middleware/deserializeUser.middleware.js';

config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', deserializeUser);
app.use('/api', authRouter);
app.use('/api', eventRouter);
app.use('/api', userRouter);

mongoose.connect(process.env.DB_URI, () => {
	app.listen(8000);
});

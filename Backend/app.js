import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

// Middlewares
app.use(cookieParser()); 
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));

import userRouter from './routes/user.routes.js'; 
import postRouter from './routes/post.routes.js';

// --- DECLARE ROUTES ---

app.use("/api/v1/users", userRouter);

app.use("/api/v1/posts", postRouter);

export { app };
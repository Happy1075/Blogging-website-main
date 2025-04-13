import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comments.routes.js';



dotenv.config();
const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/', postRouter); // Includes /home, /posts, etc.
app.use('/api/comments', commentRouter);
app.get('/', (req, res) => res.render('signin'));
app.get('/signup', (req, res) => res.render('signup'));


// Connect to database and start server
connectDB(MONGO_URI);
app.listen(port, () => console.log(`Listening on port ${port}`));

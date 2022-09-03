import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import { errorMiddleware } from './middlewares/error';
import routes from './routes';
require('dotenv').config()

const app = express();
mongoose.connect('mongodb://localhost/apiuser')

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

app.listen(process.env.PORT ?? 8080, () => {
    console.log(`listening on port ${process.env.PORT} 🚀`);
})



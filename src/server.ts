import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { errorMiddleware } from './middlewares/error';
import routes from './routes';
import configureServer from './helpers/serverConfig';
require('dotenv').config()

const app = express();
mongoose.connect(process.env.MONGODB_CONECTION as string);


app.use(express.json());

configureServer(); // Executando a função configureServer

app.use(cors({ origin: true}));
app.use(routes);



app.use(errorMiddleware);

app.listen(process.env.PORT ?? 8080, () => {
    console.log(`listening on port ${process.env.PORT} 🚀`);
})



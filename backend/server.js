import express from 'express';
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost/ECOM', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api', productRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send("backend is ready")
})

app.listen(5000, () => {
    console.log("http://localhost:5000")
})
import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import supplierRouter from './routes/supplierRouter.js';

import vendorRouter from './routes/vendorRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import imageUploadRouter from './routes/imageUploadRouter.js';

const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

app.get('/', (req, res)=>res.send("API WORKING"))



app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api/upload', imageUploadRouter); 

app.listen(port, ()=> console.log(`Server started on PORT:${port}`));
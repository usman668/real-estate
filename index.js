import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userRoute } from './Routes/AuthRoutes.js';
import { propertyRoutes } from './Routes/PropRoutes.js'
import { searchRoute } from './Routes/SearchRoutes.js'

mongoose.connect('mongodb+srv://RM:RM@cluster0.ymcif.mongodb.net/usman_db')
.then(()=>{
    console.log('Server is connected with database.')
})
.catch((error)=>{
    console.log(error.message)
})
let app = express();
let port = 3000;


app.use(express.json());
app.use(cors());


app.use('/user',userRoute);
app.use('/property', propertyRoutes);
app.use('/search', searchRoute);


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})
import express from 'express';
import { SignUp, LogIn, LogOut, getUsers, getSingleUser, updateUser, deleteUser } from '../controller/AuthCon.js';
let userRoute = express.Router();

// Routes:-
userRoute.post('/signup', SignUp)
userRoute.post('/login', LogIn)
userRoute.get('/logout/:id',LogOut)
userRoute.get('/user',getUsers)
userRoute.get('/Singleuser/:id',getSingleUser)
userRoute.patch('/Updateuser/:id',updateUser)
userRoute.delete('/Deleteuser/:id',deleteUser)
export {userRoute}
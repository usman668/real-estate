import mongoose from 'mongoose';

let userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true 
        },
        password:{
            type:String,
            require:true
        }
    }
);

let userModel = mongoose.model('RealState_Users', userSchema);
export {userModel}
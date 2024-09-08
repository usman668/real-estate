import mongoose, { mongo } from "mongoose";
let propertySchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
        price:{
            type:String, 
        },
        location:{
            type:String,
        },
        image:{
            type: String,
        },
        area:{
            type:String
        },
        bedrooms:{
            type:Number
        },
        bathrooms:{
            type:Number
        },
        catagory:{
            type:String
        }

    }
);
let propertyModel = mongoose.model('Property', propertySchema);
export {propertyModel};
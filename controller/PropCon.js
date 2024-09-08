import { propertyModel } from "../Model/PropModel.js";
import MongoDbPkg from "mongodb";
const { ObjectId } = MongoDbPkg;
// Add  a Property:-

let addProperty = async (req, resp)=>{
    let property = new propertyModel(
        { 
        ...req.body,
        image: req.file.filename
       }
       );
    try {
        let propertySave = await property.save();
        resp.send({
            message:'Property is added in database',
            property:propertySave
        })
    } catch (error) {
        console.log(error)
    }
};

// Get All properties:-

let getProperties = async (req, resp)=>{
    try {
        let properties = await propertyModel.aggregate([
            {
                $match:  {    }
            }
        ]);
        resp.send({
            message:"List Of Properties",
            property:properties
        })
    } catch (error) {
        console.log(error)
    }
};


// Get a single Property:-

let getProperty = async (req,resp)=>{
    try {
        let propertyId = req.params.id;
        let property = await propertyModel.aggregate([
            {
                $match:{
                    _id:new ObjectId(propertyId)
                }
            }
        ]);
        resp.send({
            message:'Property',
            detail:property
        })

    } catch (error) {
        resp.send(error)
    }
};

// Update Property:-

let updateProperty = async (req, resp) => {
    try {
        let propertyId = req.params.id;
        let updatedInfo = req.body;
        if (req.file) {
            updatedInfo.image = req.file.filename;
        }
        let updatedProperty = await propertyModel.findByIdAndUpdate(
            propertyId, 
            updatedInfo, 
            { new: true }
        );
        resp.send({
            message: 'Property is updated',
            updatedProperty: updatedProperty
        });
    } catch (error) {
        resp.send(error);
    }
};

// Delete Property:-
let removeProperty = async (req,resp)=>{
    try {
        let propertyId = req.params.id;
        let deleteProperty = await propertyModel.findByIdAndDelete(propertyId);
        resp.send({message:'Property is deleted from database', deleteProperty})
    } catch (error) {
        resp.send(error)
    }
}


export {
    addProperty,
    getProperties,
    getProperty,
    updateProperty,
    removeProperty
}
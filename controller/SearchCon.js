import { propertyModel } from "../Model/PropModel.js";

// Search Property By its area or price:-

let searchByArea = async (req,resp)=>{
    try {
        let {area} = req.body;
        if(!area){
          resp.send({message:'Property not found'})
        }else{
            let property = await propertyModel.aggregate( [
                {
                    $match:{
                        area:{$regex:area, $options:'i'},
                    },
                }
            ] );
            resp.send({message:'Property Found', property})
        }
        
    } catch (error) {
        resp.send(error)
    }
}



let searchByPrice = async (req,resp)=>{
    try {
        let {price} = req.body;
        if(!price){
          resp.send({message:'Property not found'})
        }else{
            let property = await propertyModel.aggregate( [
                {
                    $match:{
                        price:{$regex:price, $options:'i'},
                    },
                }
            ] );
            resp.send({message:'Property Found', property})
        }
        
    } catch (error) {
        resp.send(error)
    }
}



let searchByCatagory = async (req,resp)=>{
    try {
        let {catagory} = req.body;
        if(!catagory){
          resp.send({message:'Property not found'})
        }else{
            let property = await propertyModel.aggregate( [
                {
                    $match:{
                        catagory:{$regex:catagory, $options:'i'},
                    },
                }
            ] );
            resp.send({message:'Property Found', property})
        }
        
    } catch (error) {
        resp.send(error)
    }
}


export {
    searchByArea,
    searchByPrice,
    searchByCatagory
}
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import {addProperty, getProperties, getProperty, updateProperty, removeProperty} from '../controller/PropCon.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer For image store:-
import multer from "multer";
let storage = multer.diskStorage( {
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../images'))
    },
    filename:function(req, file, cb){
         let name = Date.now() + '-' + file.originalname;
         cb(null, name)
    }
} );
let upload = multer({storage:storage})

let propertyRoutes = express.Router();

propertyRoutes.post('/add', upload.single('image'), addProperty);
propertyRoutes.get('/get', getProperties);
propertyRoutes.get('/getSingle/:id', getProperty);
propertyRoutes.put('/update/:id', upload.single('image'), updateProperty);
propertyRoutes.delete('/delete/:id', removeProperty);

export {
    propertyRoutes
}
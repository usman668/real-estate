import express from "express";
import { searchByArea, searchByCatagory, searchByPrice } from "../controller/SearchCon.js";
let searchRoute = express.Router();

searchRoute.get('/searchArea',searchByArea);
searchRoute.get('/searchCatagory',searchByCatagory);
searchRoute.get('/searchPrice',searchByPrice);

export {
    searchRoute
}
//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getComapnies() function in the /data/data.js file 3 to return the list of comapnies and call it in the /companies route.  You can also import your getComapny(id) function and call it in the :/id route.
import axios from "axios";
import express from 'express';
import {getCompanies,getCompanyById} from "../data/data.js"
const router = express.Router();

router.route('/')
.get(async(req,res) => {
    try {
        const company_list = await getCompanies()
        return res.json(company_list)
        
    } catch (error) {
        return res.status(500).send(error);
    }
})


router.route('/:id')
.get(async(req,res) => {
    try {
        const id = req.params.id 
        const company_list_id = await getCompanyById(id)
        if(!company_list_id){
            return res.status(404).json({message: 'Company Not Found!'});
        }
        return res.json(company_list_id)
        
    } catch (error) {
        return res.status(500).send(error);
        
    }
})

export default router;

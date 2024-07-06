//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
import express from 'express';
import {getPeople,getPersonById} from "../data/data.js"
const router = express.Router();

router.route('/').get(async(req,res) => {
    try {
        const people_list = await getPeople()
        return res.json(people_list)
        
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.route('/:id')
.get(async(req,res) => {
    try {
        const id = req.params.id 
        const people_list_id = await getPersonById(id)
        if(!people_list_id){
            return res.status(404).json({message: 'Person Not Found!'});
        }
        return res.json(people_list_id)
        
    } catch (error) {
        return res.status(500).send(error);
    }
})

export default router;

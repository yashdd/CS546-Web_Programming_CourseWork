//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import express from "express";
import {searchMovieById,searchMoviesByName} from '../data/movies.js'
import {static as staticDir} from 'express';

const router = express.Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  
  res.render('home',{page_title:"Movie Finder"});

});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.

  const search_title = req.body;
  if (!search_title || Object.keys(search_title).length === 0) {
    return res.status(400).render('error');
  }
      
  try{
    if(!search_title.searchMoviesByName){
      return res.status(400).render('error',{message1:"Title not provided",page_title:"Error"});
    }
    if(search_title.searchMoviesByName.trim() === ""){
      return res.status(400).render('error',{message1:"Just empty spaces provided in Title",page_title:"Error"});
    }
    const list_of_movies = await searchMoviesByName(search_title.searchMoviesByName);
    if(list_of_movies.length === 0){
      return res.status(404).render('error',{searchMoviesByName:search_title.searchMoviesByName,page_title:"Error"})
    }
    return res.render('movieSearchResults',{movies:list_of_movies,title_searched:search_title.searchMoviesByName,page_title:"Movies Found"})
  }catch(error){
    return res.status(500).json({error})
  }
});

router.route('/movie/:id').get(async (req, res) => {
  const given_id = req.params.id;
  try{
    if(!given_id){
      return res.status(400).render('error',{message2:"ID not provided",page_title:"Error"});
    }
    if(typeof given_id!== 'string'){
      return res.status(400).render('error',{message2:"ID not a string",page_title:"Error"});
    }
    if(given_id.trim() === ""){
      return res.status(400).render('error',{message2:"Just empty spaces provided in ID",page_title:"Error"});
    }
    const movie_recd = await searchMovieById(given_id);
   // console.log(movie_recd)
    if(movie_recd.Response === 'False'){
      return res.status(404).render('error',{searchMoviesByName:given_id,page_title:"Error"})
    }
    
    return res.render('movieById',{movie:movie_recd,page_title:movie_recd.Title})

  }catch(error){
    return res.status(500).json({error})
  }
});

export default router

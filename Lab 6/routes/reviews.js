// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import { reviewData } from '../data/index.js';
import { dbConnection } from "../config/mongoConnection.js";
import reviewDataFunctions from '../data/reviews.js';
import { ObjectId }  from 'mongodb';
import productDataFunctions from './products.js';

const router = express.Router();

router
  .route('/:productId')
  .get(async (req, res) => {
    try {
      const prod_id = req.params.productId
      if(!prod_id){
        return res
          .status(400)
          .json({error: 'Product ID not provided'});
        
      }
      if(typeof prod_id!=='string'){
        return res
          .status(400)
          .json({error: 'Product ID should be of type string'});
   
      }
      if(prod_id.trim() === ''){
        return res
          .status(400)
          .json({error: 'ID should not contain just empty strings'});
      
      }
    
      const review_list = await reviewDataFunctions.getAllReviews(prod_id);
      return res.status(200).json(review_list)
    } catch (error) {
      return res.status(404).json({error})
    }
  })
  .post(async (req, res) => {
    const review_info = req.body;
    if (!review_info || Object.keys(review_info).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
  try {
    if(!review_info.title || !review_info.reviewerName || !review_info.review  || !review_info.rating){
      return res
        .status(400)
        .json({error: 'All the parameters must be supplied'});
    
    }
    if(typeof review_info.productId!== 'string',typeof review_info.title!== 'string',typeof review_info.reviewerName!== 'string',typeof review_info.review!== 'string'){
       return res
        .status(400)
        .json({error: 'All the parameters must be of type string'});
    }
    if(review_info.title.trim() ===''|| review_info.reviewerName.trim() ===''|| review_info.review.trim() ===''){
      return res
        .status(400)
        .json({error: 'String should not contain just empty spces'});
    }
    if(!ObjectId.isValid(req.params.productId)){
      return res
        .status(400)
        .json({error: 'Invalid Object ID'});
     
    }
    const product_entry = await productDataFunctions.get(req.params.productId)
    if(!product_entry){
      return res
        .status(400)
        .json({error: 'No Product found for the given ID'});
     
    }
    if(typeof review_info.rating!=='number'){
      return res
        .status(400)
        .json({error: 'Rating is not of type numbe'});
      
    }
    if(review_info.rating>5 || review_info.rating <1){
      return res
        .status(400)
        .json({error: 'Rating should be between 1 to 5'});
      
    }
    const check_rating = review_info.rating*10
    if(check_rating!= Math.floor(check_rating)){
      return res
        .status(400)
        .json({error: 'Rating should contain only 1 decimal place'});
    
    }
    const review_add = await reviewDataFunctions.createReview(req.params.productId,review_info.title,review_info.reviewerName,review_info.review,review_info.rating);
    return res.status(200).json(review_add)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    try {
      const review_id = req.params.reviewId
      if(!review_id){
        return res
        .status(400)
        .json({error: 'Review ID not provided'});
       }
      if(typeof review_id!=='string'){
        return res
        .status(400)
        .json({error: 'Review ID should be of type string'});
       }
      if(review_id.trim() === ''){
        return res
        .status(400)
        .json({error: 'Review ID should not contain just empty strings'});
       }
       if(!ObjectId.isValid(review_id)){
        return res
        .status(400)
        .json({error: 'Invalid ID'});
      }
      // review_id = review_id.trim()
      const review = await reviewDataFunctions.getReview(review_id);
      return res.status(200).json(review)
    } catch (error) {
      return res.status(404).json({error})
    }
  })
  .patch(async (req, res) => {
    const review_updates = req.body;
    if (!review_updates || Object.keys(review_updates).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    if(!req.params.reviewId){
      return res
        .status(400)
        .json({error: 'Review ID not provided'});
    }
    if(typeof req.params.reviewId!== 'string'){
      return res
        .status(400)
        .json({error: 'Review ID is not of the type string'});
     }
    if(req.params.reviewId.trim()===''){
      return res
        .status(400)
        .json({error: 'Review ID is an empty string'});
     }
    
    if(review_updates.title && typeof review_updates.title!== 'string' || review_updates.title.trim() === '' || review_updates.title === "" ){
      return res
        .status(400)
        .json({error: 'Invalid Title provided'});
     }
    if(review_updates.reviewerName && (typeof review_updates.reviewerName!== 'string' || review_updates.reviewerName.trim() === ''|| review_updates.reviewerName === "")){
      return res
        .status(400)
        .json({error: 'Invalid Review Name provided'});
     }
    if(review_updates.review && typeof review_updates.review!== 'string' ||  review_updates.review.trim() === '' || review_updates.review === ""){
      return res
        .status(400)
        .json({error: 'Invalid Review provided'});
     }
    if(review_updates.rating && typeof review_updates.rating!== 'number' || review_updates.rating == ""){
      return res
        .status(400)
        .json({error: 'Invalid Rating provided'});
    }
    if(review_updates.rating && review_updates.rating>5 || review_updates.rating <1){
      return res
        .status(400)
        .json({error: 'Rating should be between 1 to 5'});
    }
    if(review_updates.rating){
      const check_rating = review_updates.rating*10
      if(check_rating!= Math.floor(check_rating)){
        return res
        .status(400)
        .json({error: 'Rating should contain only 1 decimal place'});
    }
    }
  try {
    const updated_product = await reviewDataFunctions.updateReview(req.params.reviewId,review_updates);
    return res.status(200).json(updated_product)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
  })
  .delete(async (req, res) => {
    try {
      const review_id = req.params.reviewId
      if(!review_id){
        return res
        .status(400)
        .json({error: 'Review ID not provided'});
       }
      if(typeof review_id!== 'string'){
        return res
        .status(400)
        .json({error: 'Review ID is not of the type string'});
       }
      if(review_id.trim()===''){
        return res
        .status(400)
        .json({error: 'Review ID is an empty string'});
       }
       if(!ObjectId.isValid(review_id)){
        return res
        .status(400)
        .json({error: 'Invalid ID'});
      }
      const review = await reviewDataFunctions.removeReview(review_id);
      return res.status(200).json(review)
    } catch (error) {
      return res.status(404).json({error})
    }
  });
  export default router;

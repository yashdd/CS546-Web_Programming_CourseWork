// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId }  from 'mongodb';
import {products} from '../config/mongoCollections.js';
import productDataFunctions from './products.js';
import { dbConnection } from "../config/mongoConnection.js";

const reviewDataFunctions = {
 async createReview(
  productId,
  title,
  reviewerName,
  review,
  rating
){

  if(!productId || !title || !reviewerName || !review  || !rating){
    throw 'All the parameters must be supplied'
  }
  if(typeof productId!== 'string',typeof title!== 'string',typeof reviewerName!== 'string',typeof review!== 'string'){
    throw 'All the parameters must be of type string'
  }
  if(title.trim() ===''|| reviewerName.trim() ===''|| review.trim() ===''){
    throw 'String should not contain just empty spces'
  }
  if(!ObjectId.isValid(productId)){
    throw 'Invalid Object ID'
  }
  title = title.trim();
  reviewerName = reviewerName.trim();
  review = review.trim();
  const product_entry = await productDataFunctions.get(productId)
  if(!product_entry){
    throw 'No Product found for the given ID'
  }
  if(typeof rating!=='number'){
    throw 'Rating is not of type number'
  }
  if(rating>5 || rating <1){
    throw 'Rating should be between 1 to 5'
  }
  const check_rating = rating*10
  if(check_rating!= Math.floor(check_rating)){
    throw 'Rating should contain only 1 decimal place'
  }
  const date = new Date()
  const yy = date.getFullYear();
  const mm = String(date.getMonth()+1).padStart(2,"0");
  const dd = String(date.getDate()).padStart(2,"0");
  const review_date = `${mm}/${dd}/${yy}/`;

  const review_to_be_inserted = { 
   
    _id: new ObjectId(),
    title:title,
    reviewDate:review_date,
    reviewerName:reviewerName, 
    review:review,
    rating:rating
    
  };
  const product = await products()
  
  const result = await product.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    {$push:{reviews :{$each : [review_to_be_inserted]}}} ,
    {returnDocument: 'after'}
  );
  if(!result){
    throw 'Error: Document not found';
  }
  else if (result.modifiedCount === 0){
    throw 'Error: Insert failed';
    
  } 
  const avg_upd = await product.findOne(
    {_id: new ObjectId(productId)})
  const totalRating = avg_upd.reviews.reduce((sum, review) => sum + review.rating, 0);
  
  const averageRating_updated = totalRating / avg_upd.reviews.length;
  
  const updated_proj = await product.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    { $set: { averageRating: averageRating_updated } },
    {new: true}
  )
  if(updated_proj.modifiedCount === 0){
    throw 'Avg not updated'
  }
  const product_obj = await productDataFunctions.get(productId);
  return product_obj


},

async getAllReviews(productId){
  if(!productId){
    throw 'Product ID not provided'
  }
  if(typeof productId!=='string'){
    throw 'Product ID should be of type string'
  }
  if(productId.trim() === ''){
    throw 'ID should not contain just empty strings'
  }
  productId = productId.trim()

  if(!ObjectId.isValid(productId)){
  throw 'Invalid Object ID'
}
  const product_coll = await products()
  let product = await product_coll.findOne({_id:new ObjectId(productId)});
  if(!product){
    throw 'Error: No Products Found'
  }
  const reviews = product.reviews
  return reviews
},

async getReview(reviewId){
  if(!reviewId){
    throw 'Review ID not provided'
  }
  if(typeof reviewId!=='string'){
    throw 'Review ID should be of type string'
  }
  if(reviewId.trim() === ''){
    throw 'Review ID should not contain just empty strings'
  }
  reviewId = reviewId.trim()

  if(!ObjectId.isValid(reviewId)){
  throw 'Invalid Object ID'
}
  const product_coll = await products()
  const review = await product_coll.findOne(
    { 'reviews._id': new ObjectId(reviewId) }, 
    {projection: {_id: 0, 'reviews.$': 1}}
  );  
  // return review.reviews;
  if (!review || !review.reviews || review.reviews.length === 0) {
    throw 'Rewview not found for given ID'
  }
  
  return review.reviews[0]; 


},

async updateReview (reviewId, updateObject){
  if(!reviewId){
    throw 'Review ID not provided'
  }
  if(typeof reviewId!== 'string'){
    throw 'Review ID is not of the type string'
  }
  if(reviewId.trim()===''){
    throw 'Review ID is an empty string'
  }
  if(!ObjectId.isValid(reviewId)){
    throw 'Invalid Object ID'
  }
  if(updateObject.title && typeof updateObject.title!== 'string' && updateObject.title.trim() === ''){
    throw 'Invalid Title provided'
  }
  if(updateObject.reviewerName && typeof updateObject.reviewerName!== 'string' && updateObject.reviewerName.trim() === ''){
    throw 'Invalid Title provided'
  }
  if(updateObject.review && typeof updateObject.review!== 'string' && updateObject.review.trim() === ''){
    throw 'Invalid Title provided'
  }
  if(updateObject.rating && typeof updateObject.rating!== 'number'){
    throw 'Invalid Rating provided'
  }
  if(updateObject.rating && updateObject.rating>5 || updateObject.rating <1){
    throw 'Rating should be between 1 to 5'
  }
  if(updateObject.rating){
    const check_rating = updateObject.rating*10
    if(check_rating!= Math.floor(check_rating)){
    throw 'Rating should contain only 1 decimal place'
  }
  }
  if(updateObject.title){
    updateObject.title = updateObject.title.trim()

  }
  if(updateObject.reviewerName){
    updateObject.review = updateObject.reviewerName.trim()

  }
  if(updateObject.review){
    updateObject.reviewerName = updateObject.review.trim()

  }
  const date = new Date()
  const yy = date.getFullYear();
  const mm = String(date.getMonth()+1).padStart(2,"0");
  const dd = String(date.getDate()).padStart(2,"0");
  const review_date = `${mm}/${dd}/${yy}/`;

  const updateFields = {};

if (updateObject.title) {
  updateFields['reviews.$.title'] = updateObject.title;
}
if (updateObject.reviewerName) {
  updateFields['reviews.$.reviewerName'] = updateObject.reviewerName;
}
if (updateObject.review) {
  updateFields['reviews.$.review'] = updateObject.review;
}
if (updateObject.rating) {
  updateFields['reviews.$.rating'] = updateObject.rating;
}
updateFields['reviews.$.reviewDate'] = review_date

  const product_coll = await products();
  const review_to_update = await product_coll.findOneAndUpdate(
    { 'reviews._id': new ObjectId(reviewId) } ,
    { $set:  updateFields  },  
    { 
      returnDocument: 'after' 
    }
  );
  if(!review_to_update){
    throw 'No Product with given review ID found'
  }
  
  const avg_upd = await product_coll.findOne(
    { 'reviews._id': new ObjectId(reviewId) })
  const totalRating = avg_upd.reviews.reduce((sum, review) => sum + review.rating, 0);
  
  const averageRating_updated = totalRating / avg_upd.reviews.length;
  
  const updated_proj = await product_coll.findOneAndUpdate(
    { 'reviews._id': new ObjectId(reviewId) },
    { $set: { averageRating: averageRating_updated } },
    {returnDocument: 'after' }
  )
  if(updated_proj.modifiedCount === 0){
    throw 'Avg not updated'
  }
  return updated_proj
  

},

async removeReview(reviewId){
  if(!reviewId){
    throw 'Review ID not provided'
  }
  if(typeof reviewId!== 'string'){
    throw 'Review ID is not of the type string'
  }
  if(reviewId.trim()===''){
    throw 'Review ID is an empty string'
  }
  if(!ObjectId.isValid(reviewId)){
    throw 'Invalid Object ID'
  }
  reviewId = reviewId.trim()
  const deletionInfo =await products()
  const product1 = await deletionInfo.findOneAndUpdate(
    { 'reviews._id': new ObjectId(reviewId) }, 
    { $pull: { reviews: { _id: new ObjectId(reviewId) } } }, 
    { returnDocument: 'after' } 
  );
  if (!product1) {
    throw 'Product not found having given review ID';
  }
  
  const totalRating = product1.reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating_updated = totalRating / product1.reviews.length;
 
  product1.averageRating = averageRating_updated;
  
  return product1;
  
  
}
};

export default reviewDataFunctions;

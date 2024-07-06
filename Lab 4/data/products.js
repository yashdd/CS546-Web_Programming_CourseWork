import { dbConnection } from "../config/mongoConnection.js";
import { ObjectId }  from 'mongodb';
import {products} from '../config/mongoCollections.js';


// TODO: Export and implement the following functions in ES6 format

export const get = async (id) => {
  
  if(!id){
    throw 'Parameter ID not provided'
  }
  if(typeof id!=='string'){
    throw 'Parameter ID should be a string'
  }
  if(id.trim() === ''){
    throw 'ID should not contain just empty strings'
  }
  id = id.trim()
  if(!ObjectId.isValid(id)){
    throw 'Invalid Object ID'
  }
  let newObjId = new ObjectId(id)
  
  const productsCollection = await products()
  let result = await productsCollection.findOne({ _id: newObjId });
  if(!result){
    throw 'Given ID doesnot exist'
  }
  result._id = result._id.toString()
  //result._id = String(result._id);
  return result
};


export const create = async (
  productName,
  productDescription,
  modelNumber,  
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {

  if(!productName || !productDescription || !modelNumber || !price || !manufacturer || !manufacturerWebsite ||
    !keywords || !categories || !dateReleased){
      throw 'All fields need to be supplied'
    }
    if(typeof discontinued == 'undefined'){
      throw 'Discontinued field not supplied'
    }
  if(typeof productName!== 'string' || typeof productDescription!== 'string' || typeof modelNumber!== 'string' || typeof manufacturer!== 'string' ||
  typeof manufacturerWebsite!== 'string'  || typeof dateReleased!== 'string'){
    throw 'All fields need to be of data type String'
  }
  if(productName.trim() === '' || productDescription.trim() === '' || modelNumber.trim() === ''  || manufacturer.trim() === ''|| manufacturerWebsite.trim() === '' ||
     dateReleased.trim() === ''){
      throw 'Strings cannot be just empty spaces'
    }
    if(typeof price!== 'number'){
      throw 'Price should be of type number'
    }
  if(!price>0){
    throw 'Price should be greater than 0'
  }
  let a = Math.round(price * 100) / 100;
  if(a!== price){
    throw 'Price should be rounded max till 2 decimal places'
  }
  if(typeof discontinued!== 'boolean'){
    throw 'Discontinued field should be of type Boolean'
  }
  let start = 'http://www.'
  let end = '.com'
  if(!manufacturerWebsite.startsWith(start) || !manufacturerWebsite.endsWith(end)){
    throw ' Invalid Website address'
  }
  if(manufacturerWebsite.substring(start.length,manufacturerWebsite.length - end.length).length < 5){
    throw ' Invalid Website address'
  }
  if(!Array.isArray(keywords) || !Array.isArray(categories)){
    throw 'Keywords and Categories should be in an Array form'
  }
  if(keywords.length === 0 || categories.length === 0){
    throw 'Empty Array Passed'
  }
  for(let i=0;i<keywords.length;i++){
    if(typeof keywords[i]!== 'string' || keywords[i].trim() === ''){
      throw 'Array should contain string elements and should not be only spaces'
    }
  }
  for(let l=0;l<keywords.length;l++){
    keywords[l] = keywords[l].trim()
  }
  for(let j=0;j<categories.length;j++){
    if(typeof categories[j]!== 'string' || categories[j].trim() === ''){
      throw 'Array should contain string elements and should not be only spaces'
    }
  }
  for(let k=0;k<categories.length;k++){
    
      categories[k] = categories[k].trim()
    
  }
  if(dateReleased.split('/').length!== 3){
    throw 'Date is in invalid format'
  }
  
  dateReleased = dateReleased.trim()

  const date = dateReleased.split('/')
  if(date[2].length>4){
    throw 'Invalid Date'
  }
  const mm = parseInt(date[0])
  const dd = parseInt(date[1])
  const yy = parseInt(date[2])
  if(isNaN(mm) || isNaN(dd) || isNaN(yy)){
    throw 'Invalid Number'
  }
  if(mm>12 || mm<1){
    throw 'Invalid Month'
  }
  if(yy<1000 || yy>2024){
    throw 'Invalid Year'
  }
  if(mm===4 || mm === 6 || mm === 9 || mm===11){
    if(dd>30 || dd<1){
      throw 'Invalid Date'
    }
  }
  if(mm===2){
    if(dd>28 || dd<1){
      throw 'Invalid Date'
    }
  }
  if(dd<1 || dd>31){
    throw 'Date cannot be less than 1 or greater than 31'
  }
  

  productName = productName.trim()
  productDescription = productDescription.trim()
  modelNumber = modelNumber.trim()
  manufacturerWebsite = manufacturerWebsite.trim()
  
  //const objectId = new ObjectId().toString();
  const products_to_be_inserted = { 
  productName : productName,
  productDescription:productDescription,
  modelNumber:modelNumber,  
  price:price,
  manufacturer:manufacturer,
  manufacturerWebsite:manufacturerWebsite,
  keywords:keywords,
  categories:categories,
  dateReleased:dateReleased,
  discontinued:discontinued
  
};
//const db = await dbConnection()
//const productsCollection = db.collection('products');
const product_coll = await products()
const result = await product_coll.insertOne(products_to_be_inserted)
if (!result.acknowledged || !result.insertedId)
      throw 'Could not add Product';
const newId = result.insertedId.toString();

const product = await get(newId);
//product._id = newId
return product;
 //return products_to_be_inserted
}

export const getAll = async () => {
  const product_coll = await products()
  let all_products = await product_coll.find({}).toArray();
  if(!all_products){
    throw 'Error: No Products Found'
  }
  all_products = all_products.map((ele) => {
    ele._id = ele._id.toString()
    return ele
  })
  return all_products
};


export const remove = async (id) => {

  if(!id){
    throw 'Parameter ID not provided'
  }
  if(typeof id!=='string'){
    throw 'Parameter ID should be a string'
  }
  if(id.trim() === ''){
    throw 'ID should not contain just empty strings'
  }
  id = id.trim()
//  const objectId = new ObjectId(id);
if(!ObjectId.isValid(id)){
  throw 'Invalid Object ID'
}
  let newObj = new ObjectId(id)
  
  const productsCollection = await products()
  const product = await productsCollection.findOne({ _id: newObj });
  if(!product){
    throw 'Document with this ID Doesnot exist'
  }
  let result = await productsCollection.deleteOne({ _id: newObj });
  if(result.deletedCount === 0){
    throw 'Document with this ID Doesnot exist hence cannot delete'
  }
  return `${product.productName} has been successfully deleted!`;
};

export const rename = async (id, newProductName) => {

  if(!id){
    throw 'Parameter ID not provided'
  }
  if(typeof id!=='string'){
    throw 'Parameter ID should be a string'
  }
  if(id.trim() === ''){
    throw 'ID should not contain just empty strings'
  }
  if(!newProductName){
    throw 'Parameter Product name not provided'
  }
  if(typeof newProductName!=='string'){
    throw 'Parameter Product name should be a string'
  }
  if(newProductName.trim() === ''){
    throw 'ID should not contain just empty strings'
  }
  id = id.trim()
  if(!ObjectId.isValid(id)){
    throw 'Invalid Object ID'
  }
  newProductName = newProductName.trim()
  const product = await get(id)
  if(product.productName === newProductName){
    throw 'Product name already set to the given new name'
  }
   
  let newObjId = new ObjectId(id)
  const x = { _id:newObjId}
  
  const productsCollection = await products()
  const result = await productsCollection.updateOne(x,{$set: {productName : newProductName }})
  if (result.modifiedCount === 0) {
    throw 'Failed to update product name as id not found';
}

const up_product = await get(id)
return up_product
};

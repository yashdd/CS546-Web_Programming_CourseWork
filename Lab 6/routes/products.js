// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import {productData} from '../data/index.js';
//import {get,create,getAll,remove,update} from "../data/products.js" 
import { dbConnection } from "../config/mongoConnection.js";
import { ObjectId }  from 'mongodb';

const router = express.Router();

const data = {
  productName: "83 inch LG C3 OLED TV",
  productDescription: "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
  modelNumber: "OLED83C3PUA",    
  price: 4757.29,
  manufacturer:"LG", 
  manufacturerWebsite: "http://www.lgelectronics.com",
  keywords: ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],
  categories: ["Electronics", "Television & Video", "Televisions",  "OLED TVs"],
  dateReleased: "02/27/2023",
  discontinued: false,
}
router
  .route('/')
  .get(async (req, res) => {
    try {
      const product_list = await productData.getAll();
      return res.status(200).json(product_list)
    } catch (error) {
      return res.status(500).json({error})
    }
  })
  .post(async (req, res) => {
   
      const product_info = req.body;
      if (!product_info || Object.keys(product_info).length === 0) {
        return res
          .status(400)
          .json({error: 'There are no fields in the request body'});
      }
      if(!product_info.productName || !product_info.productDescription || !product_info.modelNumber || !product_info.price || !product_info.manufacturer || !product_info.manufacturerWebsite ||
        !product_info.keywords || !product_info.categories || !product_info.dateReleased){
          return res
          .status(400)
          .json({error: 'All fields need to be supplied'});
         }
        if(typeof product_info.discontinued == 'undefined'){
          return res
          .status(400)
          .json({error: 'Discontinued field not supplied'});
         
        }
        if(typeof product_info.productName!== 'string' || typeof product_info.productDescription!== 'string' || typeof product_info.modelNumber!== 'string' || typeof product_info.manufacturer!== 'string' ||
        typeof product_info.manufacturerWebsite!== 'string'  || typeof product_info.dateReleased!== 'string'){
          return res
          .status(400)
          .json({error: 'All fields need to be of data type String'});
        
        }
        if(product_info.productName.trim() === '' || product_info.productDescription.trim() === '' || product_info.modelNumber.trim() === ''  || product_info.manufacturer.trim() === ''|| product_info.manufacturerWebsite.trim() === '' ||
        product_info.dateReleased.trim() === ''){
            return res
          .status(400)
          .json({error: 'Strings cannot be just empty spaces'});
          
          }
          if(typeof product_info.price!== 'number'){
            return res
          .status(400)
          .json({error: 'Price should be of type number'});
          
          }
        if(!product_info.price>0){
          return res
          .status(400)
          .json({error: 'Price should be greater than 0'});
         
        }
        let a = Math.round(product_info.price * 100) / 100;
        if(a!== product_info.price){
          return res
          .status(400)
          .json({error: 'Price should be rounded max till 2 decimal places'});
     
        }
        if(typeof product_info.discontinued!== 'boolean'){
          return res
          .status(400)
          .json({error: 'Discontinued field should be of type Boolean'});
       
        }
        let start = 'http://www.'
        let end = '.com'
        if(!product_info.manufacturerWebsite.startsWith(start) || !product_info.manufacturerWebsite.endsWith(end)){
          return res
          .status(400)
          .json({error: 'Invalid Website address'});
        }
        if(product_info.manufacturerWebsite.substring(start.length,product_info.manufacturerWebsite.length - end.length).length < 5){
          return res
          .status(400)
          .json({error: 'Invalid Website address'});
         
        }
        if(!Array.isArray(product_info.keywords) || !Array.isArray(product_info.categories)){
          return res
          .status(400)
          .json({error: 'Keywords and Categories should be in an Array form'});
        
        }
        if(product_info.keywords.length === 0 || product_info.categories.length === 0){
          return res
          .status(400)
          .json({error: 'Empty Array Passed'});
         
        }
        for(let i=0;i<product_info.keywords.length;i++){
          if(typeof product_info.keywords[i]!== 'string' || product_info.keywords[i].trim() === ''){
            return res
          .status(400)
          .json({error: 'Array should contain string elements and should not be only spaces'});
         
          }
        }
        for(let l=0;l<product_info.keywords.length;l++){
          product_info.keywords[l] = product_info.keywords[l].trim()
        }
        for(let j=0;j<product_info.categories.length;j++){
          if(typeof product_info.categories[j]!== 'string' || product_info.categories[j].trim() === ''){
            return res
          .status(400)
          .json({error: 'Array should contain string elements and should not be only spaces'});
           
          }
        }
        for(let k=0;k<product_info.categories.length;k++){
          
          product_info.categories[k] = product_info.categories[k].trim()
          
        }
        if(product_info.dateReleased.split('/').length!== 3){
          return res
          .status(400)
          .json({error: 'Date is in invalid format'});
       
        }
        
        product_info.dateReleased = product_info.dateReleased.trim()
      
        const date = product_info.dateReleased.split('/')
        if(date[2].length>4){
          return res
          .status(400)
          .json({error: 'Invalid Date'});
          
        }
        const mm = parseInt(date[0])
        const dd = parseInt(date[1])
        const yy = parseInt(date[2])
        if(isNaN(mm) || isNaN(dd) || isNaN(yy)){
          return res
          .status(400)
          .json({error: 'Invalid Number'});
       
        }
        if(mm>12 || mm<1){
          return res
          .status(400)
          .json({error: 'Invalid Month'});
       
        }
        if(yy<1000){
          return res
          .status(400)
          .json({error: 'Invalid Year'});
        }
        if(yy>2024){
          return res
          .status(400)
          .json({error: 'Invalid Year'});
        }
        const today = new Date()
        const today_date = String(today.getDate()).padStart(2,"0");
        const curr_month = String(today.getMonth()+1).padStart(2,"0");
        
        if (yy === 2024) {
          if (parseInt(mm) > parseInt(curr_month)) {
              
              return res.status(400).json({ error: 'Invalid Year' });
          } else if (parseInt(mm) === parseInt(curr_month)) {
           
              if (parseInt(dd) > parseInt(today_date)) {
                  
                  return res.status(400).json({ error: 'Invalid Year' });
              }
          } 
      }
   
        
        if(mm===4 || mm === 6 || mm === 9 || mm===11){
          if(dd>30 || dd<1){
            return res
          .status(400)
          .json({error: 'Invalid Date'});
            
          }
        }
        if(mm===2){
          if(dd>28 || dd<1){
            return res
          .status(400)
          .json({error: 'Invalid Date'});
        
          }
        }
        if(dd<1 || dd>31){
          return res
          .status(400)
          .json({error: 'Date cannot be less than 1 or greater than 31'});
         
        }
    try {
      const newProduct = await productData.create(product_info.productName,product_info.productDescription,product_info.modelNumber,product_info.price,product_info.manufacturer
        ,product_info.manufacturerWebsite,product_info.keywords,product_info.categories,product_info.dateReleased,product_info.discontinued)
        return res.status(200).json(newProduct)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    try {
      const Product_ID = req.params.productId
      if(!Product_ID){
        return res
          .status(400)
          .json({error: 'Parameter ID not provided'});
        
      }
      if(typeof Product_ID!=='string'){
        return res
          .status(400)
          .json({error: 'Parameter ID should be a string'});
       
      }
      if(Product_ID.trim() === ''){
        return res
          .status(400)
          .json({error: 'ID should not contain just empty strings'});
        
      }
       
      if(!ObjectId.isValid(Product_ID)){
        return res
          .status(400)
          .json({error: 'Invalid Object ID'});
        
      }
      const product = await productData.get(Product_ID);
      return res.status(200).json(product)
    } catch (error) {
      return res.status(404).json({error})
    }
  })
  .delete(async (req, res) => {
    try {
      const Product_ID = req.params.productId
      if(!Product_ID){
        return res
          .status(400)
          .json({error: 'Parameter ID not provided'});
       }
      if(typeof Product_ID!=='string'){
        return res
          .status(400)
          .json({error: 'Parameter ID should be a string'});
       }
      if(Product_ID.trim() === ''){
        return res
          .status(400)
          .json({error: 'ID should not contain just empty strings'});
       }
       if(!ObjectId.isValid(Product_ID)){
        return res
          .status(400)
          .json({error: 'Invalid Object ID'});
        
      }
  
      const product_deleted = await productData.remove(Product_ID);
     
      return res.status(200).json(product_deleted)
    } catch (error) {
      return res.status(404).json({error})
    }
  })
  .put(async (req, res) => {
    try {
    const product_info = req.body;
    if (!product_info || Object.keys(product_info).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
  
    if(!product_info.productId || !product_info.productName || !product_info.productDescription || !product_info.modelNumber || !product_info.price || !product_info.manufacturer || !product_info.manufacturerWebsite ||
      !product_info.keywords || !product_info.categories || !product_info.dateReleased){
        return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
       
      }
      if(typeof product_info.discontinued == 'undefined'){
        return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
       
      }
      if(typeof product_info.productId!== 'string' || typeof product_info.productDescription!== 'string' || typeof product_info.modelNumber!== 'string' || typeof product_info.manufacturer!== 'string' ||
      typeof product_info.manufacturerWebsite!== 'string'  || typeof product_info.dateReleased!== 'string'){
        return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
        
      }
      if(product_info.productName.trim() === '' || product_info.productDescription.trim() === '' || product_info.modelNumber.trim() === ''  || product_info.manufacturer.trim() === ''|| product_info.manufacturerWebsite.trim() === '' ||
      product_info.dateReleased.trim() === '' || product_info.productId.trim() === ''){
        return res
        .status(400)
        .json({error: 'Strings cannot be just empty spaces'});
      
        }
        if(typeof product_info.price!== 'number'){
          return res
        .status(400)
        .json({error: 'Price should be of type number'});
       
        }
      if(!product_info.price>0){
        return res
        .status(400)
        .json({error: 'Price should be greater than 0'});
        
      }
      let a = Math.round(product_info.price * 100) / 100;
      if(a!== product_info.price){
        return res
        .status(400)
        .json({error: 'Price should be rounded max till 2 decimal places'});
        
      }
      if(typeof product_info.discontinued!== 'boolean'){
        return res
        .status(400)
        .json({error: 'Discontinued field should be of type Boolean'});
      
      }
      let start = 'http://www.'
      let end = '.com'
      if(!product_info.manufacturerWebsite.startsWith(start) || !product_info.manufacturerWebsite.endsWith(end)){
        return res
        .status(400)
        .json({error: 'Invalid Website address'});
        
      }
      if(product_info.manufacturerWebsite.substring(start.length,product_info.manufacturerWebsite.length - end.length).length < 5){
        return res
        .status(400)
        .json({error: 'Invalid Website address'});
    
      }
      if(!Array.isArray(product_info.keywords) || !Array.isArray(product_info.categories)){
        return res
        .status(400)
        .json({error: 'Keywords and Categories should be in an Array form'});
       
      }
      if(product_info.keywords.length === 0 || product_info.categories.length === 0){
        return res
        .status(400)
        .json({error: 'Empty Array Passed'});
        
      }
      for(let i=0;i<product_info.keywords.length;i++){
        if(typeof product_info.keywords[i]!== 'string' || product_info.keywords[i].trim() === ''){
          return res
        .status(400)
        .json({error: 'Array should contain string elements and should not be only spaces'});
          
        }
      }
      for(let l=0;l<product_info.keywords.length;l++){
        product_info.keywords[l] = product_info.keywords[l].trim()
      }
      for(let j=0;j<product_info.categories.length;j++){
        if(typeof product_info.categories[j]!== 'string' || product_info.categories[j].trim() === ''){
          return res
        .status(400)
        .json({error: 'Array should contain string elements and should not be only spaces'});
         
        }
      }
      for(let k=0;k<product_info.categories.length;k++){
        
        product_info.categories[k] = product_info.categories[k].trim()
        
      }
      if(product_info.dateReleased.split('/').length!== 3){
        return res
        .status(400)
        .json({error: 'Date is in invalid format'});
     
      }
      
      product_info.dateReleased = product_info.dateReleased.trim()
    
      const date = product_info.dateReleased.split('/')
      if(date[2].length>4){
        return res
        .status(400)
        .json({error: 'Invalid Date'});
        
      }
      const mm = parseInt(date[0])
      const dd = parseInt(date[1])
      const yy = parseInt(date[2])
      if(isNaN(mm) || isNaN(dd) || isNaN(yy)){
        return res
        .status(400)
        .json({error: 'Invalid Number'});
       
      }
      if(mm>12 || mm<1){
        return res
        .status(400)
        .json({error: 'Invalid Month'});
       
      }
      if(yy<1000 || yy>2024){
        return res
        .status(400)
        .json({error: 'Invalid Year'});
         
      }

      const today = new Date()
        const today_date = String(today.getDate()).padStart(2,"0");
        const curr_month = String(today.getMonth()+1).padStart(2,"0");
        
      if (yy === 2024) {
        if (parseInt(mm) > parseInt(curr_month)) {
            
            return res.status(400).json({ error: 'Invalid Year' });
        } else if (parseInt(mm) === parseInt(curr_month)) {
         
            if (parseInt(dd) > parseInt(today_date)) {
                
                return res.status(400).json({ error: 'Invalid Year' });
            }
        } 
    }
      if(mm===4 || mm === 6 || mm === 9 || mm===11){
        if(dd>30 || dd<1){
          return res
        .status(400)
        .json({error: 'Invalid Date'});
         
        }
      }
      if(mm===2){
        if(dd>28 || dd<1){
          return res
        .status(400)
        .json({error: 'Invalid Date'});
        
        }
      }
      if(dd<1 || dd>31){
        return res
        .status(400)
        .json({error: 'Date cannot be less than 1 or greater than 3'});
     
      }
      
    const updated_product = await productData.update(product_info.productId,product_info.productName,product_info.productDescription,product_info.modelNumber,product_info.price,product_info.manufacturer
      ,product_info.manufacturerWebsite,product_info.keywords,product_info.categories,product_info.dateReleased,product_info.discontinued)
      return res.status(200).json(updated_product)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
  });


  export default router;

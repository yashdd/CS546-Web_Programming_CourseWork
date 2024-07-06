/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/
import {dbConnection,closeConnection} from './config/mongoConnection.js';  
import {create,getAll,get,remove,rename} from './data/products.js';
import { ObjectId }  from 'mongodb';


const db = await dbConnection();
//await db.dropDatabase();
  try {
    
    let a = await create(
      'Best TV Ever',
      "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
      'OLED83C3PUA',
      250,
      'LGX',
      'http://www.lgesls.com',
      ['TV', 'Smart TV', 'ds ', 'LG', 'Big Screen', '83 Inch','Random'],
      ['Electronics',  'Television & Video ', 'OLED TVs'],
      '5/31/2002',
      true
  );
    console.log(a)

  } catch (error) {
    console.error(error);
  }

  try {
    
    let b = await create(
      '32 inch LG C3d OLED TV',
      'Newly Launcehd TV from LGX1',
      'OLED83C3PUA',
      2534.98,
      'LGX1',
      'http://www.lgesls.com',
      ['TV', 'Smart TV', 'ds ', 'LGX', 'Big Screen', '32 Inch','Random'],
      ['Electronics', 'Television & Video', 'Televisions', 'OLED TVs'],
      '12/31/2015',
      false
  );
     

  } catch (error) {
    console.error(error);
  }


  try {
    let c = await getAll()
    console.log(c)
  } catch (error) {
    console.error(error);
  }

  try {
    
    let d = await create(
      '24 inch LG C3d OLED TV',
      'Old TV from LGX1',
      'CDY674',
      1234.98,
      'LGX1',
      'http://www.lgeesls.com',
      ['TV', 'Smart TV','Random'],
      ['Electronics', 'Television & Video', 'Televisions', 'OLED TVs'],
      '2/23/2021',
      false
  );
    console.log(d)
     

  } catch (error) {
    console.error(error);
  }

  try {
    
    
    let g = await rename('65d6965224d911cb199c7f48','New Updated Name')
    console.log(g)
  } catch (error) {
    console.error(error);
  }

  try {
    
    let h = "65d6965224d911cb199c7f48"
    let i = await get(h)
    console.log(i)
  } catch (error) {
    console.error(error);
  }

  try {
    
    let j = '65d6965224d911cb199c7f49'  // ID to be removed
    let k = await remove(j)
    console.log(k)
  } catch (error) {
    console.error(error);
  }

  try {
    let l = await getAll()
    console.log(l)
  } catch (error) {
    console.error(error);
  }

try {
    
    let m = await create(
      '',
      "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
      'OLED83C3PUA',
      3232.914,
      'LGX',
      'http://www.lgesls.com',
      ['TV', 'Smart TV', 'ds ', 'LG', 'Big Screen', '83 Inch','Random'],
      ['Electronics', 'Television & Video', 'Televisions', 'OLED TVs'],
      '12/31/2002',
      true
  );
    console.log(m)

  } catch (error) {
    console.error(error);
  }

   try {
    
    let n = '65d693e45d51e60e75f05e25'  // Dummy iD
    let o = await remove(n)
    console.log(o)
  } catch (error) {
    console.error(error);
  }

  try {
    
    let p = '65d3b9757514898a9851af32'   // Dummy ID
    let q = await rename('65d3b9757514898a9851af32','New Name')
    console.log(q)
  } catch (error) {
    console.error(error);
  }

  try {
    
    let r = '65d6965224d911cb199c7f48'   // Valid ID
    let s = await rename(r,65)
    console.log(s)
  } catch (error) {
    console.error(error);
  }

    try {
    
    let t = "65d4ece4ad82093693e31f47"  //Dummy ID
    let u = await get(t)
    console.log(u)
  } catch (error) {
    console.error(error);
  }


  await closeConnection();
  

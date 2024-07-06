/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import axios from "axios";

import {getAuthorById,searchAuthorsByAge,getBooksByState,searchAuthorsByHometown,getAuthorBooks}  from "./authors.js"
import {getBookById,booksByPageCount,sameYear,minMaxPrice,searchBooksByPublisher}  from "./books.js"

// Two Testcases per function, One passes, one fails
// Function - > getAuthorById
// try {
    
//     const a = await getAuthorById('259bc2c1-2fcb-44a9-b3a4-ac6ca89a7e2c')
//     console.log (a);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
    
//     const a1 = await getAuthorById('')
//     console.log (a1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // Function - > searchAuthorsByAge
// try {
//     const b = await searchAuthorsByAge(34)
//     console.log (b);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const b1 = await searchAuthorsByAge(-3)
//     console.log (b1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // // Function - > getBooksByState

// try {
//     const c = await getBooksByState('CA')
//     console.log (c);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const c1 = await getBooksByState('R7')
//     console.log (c1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // Function - > searchAuthorsByHometown
// try {
//     const d = await searchAuthorsByHometown('Pinellas Park','FL')
//     console.log (d);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const d1 = await searchAuthorsByHometown('Jersey','CA')
//     console.log (d1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // // Function - > getAuthorBooks
// try {
//     const e = await getAuthorBooks('d7b5a558-a8ce-4aed-95b4-f9a92f663fb7')
//     console.log (e);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const e1 = await getAuthorBooks(4353)
//     console.log (e1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // Function - > getBookById
// try {
//     const f = await getBookById('f3eabffa-0ea9-48e2-b25d-2711c91a035e')
//     console.log (f);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const f1 = await getBookById('randomid')
//     console.log (f1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // Function - > booksByPageCount
// try {
//     const g = await booksByPageCount(310,320)
//     console.log (g);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const g1 = await booksByPageCount(100,-2)
//     console.log (g1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // Function - > sameYear
// try {
//     const h = await sameYear(2003)
//     console.log (h);
    
// } catch (error) {
//     console.log(error)
    
// }

// try {
//     const h1 = await sameYear()
//     console.log (h1);
    
// } catch (error) {
//     console.log(error)
    
// }

// // Function - > minMaxPrice
// try {
//     const i = await minMaxPrice()
//     console.log (i);
    
// } catch (error) {
//     console.log(error)
    
// }


// // Function - > searchBooksByPublisher
try {
    const j = await searchBooksByPublisher('gIgAcLuB')
    console.log (j);
    
} catch (error) {
    console.log(error)
    
}

// try {
//     const j1 = await searchBooksByPublisher('Fake')
//     console.log (j1);
    
// } catch (error) {
//     console.log(error)
    
// }


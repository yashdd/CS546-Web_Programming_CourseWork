/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
// Name - Yash Deshpande CS546C  CWID - 20025089

import {arrayPartition,arrayShift,matrixOne} from './arrayUtils.js';
import{swapChars,longestCommonSubstring,palindromeOrIsogram} from './stringUtils.js';
import{objectStats,nestedObjectsDiff,mergeAndSumValues} from './objectUtils.js';

// Array Utils - > arrayPartition function
//Testcase will pass
try {
     
    const arrayToPartition2 = [10, 15, 20, 25, 30]; 
    const partitionFunc2 = (num) => num > 18; 
    const partitionedArrays3 = arrayPartition(arrayToPartition2, partitionFunc2); 
    console.log(partitionedArrays3)
 } catch (error) {
    console.log(error)
 }

 //Testcase will Fail
 try {
     
    const arrayToPartition1 = ['dates']
    const partitionFunc1 = (fruit) => fruit.length >= 3; 
    const partitionedArrays1 = arrayPartition(arrayToPartition1, partitionFunc1); 
    console.log(partitionedArrays1)
 } catch (error) {
    console.log(error)
 }

 // Array Utils - > arrayShift function

 //Testcase will pass
 try {
    const arrshift1 = arrayShift([3,4,5,6,9], 3)
    console.log(arrshift1)
    
} catch (error) {
    console.log(error)
}
 //Testcase will Fail
 try {
    const arrshift2 = arrayShift(['Yash',5,3,'De'], 3.4)
    console.log(arrshift2)
    
} catch (error) {
    console.log(error)
}

// Array Utils - > matrixOne function

 //Testcase will pass
 try {
    const matrix1 = matrixOne([[0,1,2,0],[3,5,4,2],[1,7,3,5]]) 
    console.log(matrix1)
 } catch (error) {
    console.log(error)
 }

 //Testcase will Fail
 try {
    const matrix2 = matrixOne([])
    console.log(matrix2)
 } catch (error) {
    console.log(error)
 }


 // String Utils    -> swapChars function

 //Testcase will Pass
try {
    const swap1 = swapChars("Yash","Deshpande");
    console.log(swap1)
} catch (error) {
    console.log(error)
}
 //Testcase will Fail
 try {
    const swap2 = swapChars("e","random");
    console.log(swap2)
} catch (error) {
    console.log(error)
}


 // String Utils    -> longestCommonSubstring function

 //Testcase will Pass

 try {
    
    const str1 = "Yashdesh"; 
    const str2 = "deshpande"; 
    const commonSubstring1 = longestCommonSubstring(str1, str2);
    console.log(commonSubstring1)
 } catch (error) {
    console.log(error)
 }

 //Testcase will Fail

 try {
    const str1 = "random"; 
    const str2 = 34; 
    const commonSubstring2 = longestCommonSubstring(str1, str2);
    console.log(commonSubstring2)
 } catch (error) {
    console.log(error)
 }

 // String Utils    -> palindromeOrIsogram function
 
 // Testcase will pass
try {
    const strings3 = ["hello", "world", "Java", "Python"]; 
    const results3 = palindromeOrIsogram(strings3); 
    console.log(results3);
} catch (error) {
    console.log(error)
}
 // Testcase will fail
try {
    const strings4 = ["fs", "abcd", "Is it OK?", "No lemon, no melon", "","ds"]
    const results4 = palindromeOrIsogram(strings4); 
    console.log(results4)
    
} catch(error) {
    console.log(error)
}

// Object Utils    -> objectStats

// Testcase will pass
try {
    const arrayOfObjects3 = [ { alpha: 3.5, beta: 7.2, gamma: 4.8 }, { x: 0, y: 0, z: 0 }, { p: -2, q: -8, r: -5 }, ]; 
    const statsResult1 = objectStats(arrayOfObjects3); 
    console.log(statsResult1)
} 
catch (error) {
    console.log(error)
}
 // Testcase will fail
try {
    const arrayOfObjects4 = [ { a: 1, b: 7.2, gamma: '' }, { x: 0, y: 10, z: 11 }, { c: -2, d: -8, e: -5 }, ]; 
    const statsResult2 = objectStats(arrayOfObjects4); 
    console.log(statsResult2)
} catch (error) {
    console.log(error)
}

// Object Utils    -> nestedObjectsDiff

// Testcase will pass

try {
    const obj1 = { key1: "value1", key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3], }, }; 
    const obj2 = { key1: "value1", key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey", }; 
    const differences1 = nestedObjectsDiff(obj1, obj2); 
    console.log(differences1)
} catch (error) {
    console.log(error)
}

// Testcase will fail
try {
    const obj3 = {  }; 
    const obj4 = { x: { y: { z: 1 } } }; 
    const differences2 = nestedObjectsDiff(obj3, obj4); 
    console.log(differences2)
} catch (error) {
    console.log(error)
}


// Object Utils    -> mergeAndSumValues

// Testcase will pass

try {
    const obj1 = { a: 1, b: 2, c: 3 }; 
    const obj2 = { b: 3, c: 4, d: 5 }; 
    const obj3 = { a: 2, c: 1, e: 6 }; 
    const result4 = mergeAndSumValues(obj1, obj2, obj3);
    console.log(result4)

} catch (error) {
    console.log(error)
}

// Testcase will fail

try {
    const obj10 = {}; 
    const obj11 = { b: 3, c: 4, d: 5}; 
    const obj12 = { k: 2 }; 
    const result4 = mergeAndSumValues(obj10, obj11, obj12);
    console.log(result4)
    
} catch (error) {
    console.log(error)
    
}



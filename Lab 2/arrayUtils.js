/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/


export let arrayPartition = (arrayToPartition, partitionFunc) => {
  //code goes here
  if(!Array.isArray(arrayToPartition)){
    throw 'First Parameter should be an array'
  }
  if(arrayToPartition.length < 2){
    throw 'Parameter Array should have atleast 2 elements'
  }
  if(typeof arrayToPartition === 'undefined'){
    throw 'Parameter should not be an empty array'
  }
  for(let d = 0;d<arrayToPartition.length;d++){
    if(typeof arrayToPartition[d] === 'string'){
      arrayToPartition[d] = arrayToPartition[d].trim()   
    }
  }
  for(let d = 0;d<arrayToPartition.length;d++){
    if(arrayToPartition[d] === ''){
      throw 'Input should not be just empty string'
    }
  }
  if(typeof partitionFunc!= 'function'){
     throw 'Second Parameter should be a function'
  }
  for(let d = 0;d<arrayToPartition.length;d++){
    if(typeof arrayToPartition[d] === 'undefined'){
      throw 'Undefined element present in the given array'
    }
  }

  let partitionedArray1 = []
  let partitionedArray2 = []
  
  partitionedArray1 = arrayToPartition.filter(partitionFunc);
  partitionedArray2 = arrayToPartition.filter(item => !partitionFunc(item));
 
 
  return [partitionedArray1,partitionedArray2]
};  

export let arrayShift = (arr, n) => {
  //code goes here
  if(!Array.isArray(arr)){
    throw 'First Parameter should be an array'
  }
  if(arr.length < 2){
    throw 'First Parameter Array should have atleast 2 elements'
  }
  for(let i=0;i<arr.length;i++){
    if(typeof arr[i] === 'string'){
      arr[i] =arr[i].trim()
    }
  }
  if(typeof n!== 'number'){
    throw 'Second Parameter should be of a whole number'
  }
  if (isNaN(n)) {
    throw 'Provided number is NaN';
 }
  if(!Number.isInteger(n)){
     throw 'Second Parameter should not be a decimal number'
  }
 

  let result = []
  if(n===0){
    return arr;
  }
  if(n>0){
    for(let i=0;i<arr.length;i++){
      const j = (i+n)%arr.length
      result[j] = arr[i]
    }
  }
  if(n<0){
    for(let i=0;i<arr.length;i++){
      let j = ((i+n)+arr.length)%arr.length 
      if(j<0){
        j = j + arr.length
        result[j] = arr[i]
      }else{
        result[j] = arr[i]
      }
      
    }
  }
   
  return result
};

export let matrixOne = (matrix) => {
  //code goes here
  if(!Array.isArray(matrix)){
     throw 'Parameter should be an array'
  }
  if(matrix.length === 0){
    throw 'Array should not be empty'
  }
  for(let y=0;y<matrix.length;y++){
    if(!Array.isArray(matrix[y])){
      throw 'Each element inside array should also be an array'
    }
  }
  for(let y=0;y<matrix.length;y++){
    if(matrix[y].length == 0){
      throw 'Array should not be empty'
    }
  }
  for(let y=0;y<matrix.length;y++){
    for(let z=0;z<matrix[y].length;z++){
      if(typeof matrix[y][z]!== 'number'){
        throw 'Row and Column Arrays should only contain number'
      }
    }
  }
  for(let y=1;y<matrix.length;y++){
    if(matrix[y].length!= matrix[0].length){
      throw 'All rows in the matrix should be of same length'
    }
  }

  let track_zero = []
  for(let i=0;i<matrix.length;i++){
    for(let j =0;j<matrix[i].length;j++){
      if(matrix[i][j] == 0){
        track_zero.push([i,j])
      }
    }
  }
    for(let i=0;i<track_zero.length;i++){
      const r = track_zero[i][0]
      const c = track_zero[i][1]
      for(let m=0;m<matrix.length;m++){
        matrix[m][c] = 1
      }
      for(let n=0;n<matrix[0].length;n++){
        matrix[r][n] = 1
      }
    }
    return matrix;
  };
  


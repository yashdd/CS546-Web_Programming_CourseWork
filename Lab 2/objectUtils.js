/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let objectStats = (arrObjects) => {
  //Code goes here
  if(!arrObjects){
    throw 'Input Parameter doesnot exist'
  }
  if(!Array.isArray(arrObjects)){
    throw 'Parameter should be an array'
  }
  
  if(arrObjects.length === 0){
    throw 'Array should contain objects, it should not be empty'
  }
 for(let i=0;i<arrObjects.length;i++){
    if(typeof arrObjects[i]!== 'object'){
      throw 'Each element in array should be an object'
    }
   
 }
 for(let i=0;i<arrObjects.length;i++){
  if(Object.keys(arrObjects[i]).length === 0){
    throw 'Each object should have atleast one key value pair'
  }
 
}
for(let i=0;i<arrObjects.length;i++){
  for(let j in arrObjects[i]){
    let k = arrObjects[i][j]
    if(typeof k!= 'number' || isNaN(k)){
      throw 'Each value in the object should be a number'
    }
     
  }
}
for(let i=0;i<arrObjects.length;i++){
  for(let j in arrObjects[i]){
    let k = arrObjects[i][j]
    let test_num = Math.round(k * 1000) / 1000;
    if(test_num!== k){
      throw 'Decimal numbers should only be rounded till 3 decimal places'
    }
     
  }
}

  let values = []
  let modefind_obj = {};
  let result = {}
  for(let i=0;i<arrObjects.length;i++){
    for(let j=0;j<Object.keys(arrObjects[i]).length;j++){
      values.push(arrObjects[i][Object.keys(arrObjects[i])[j]]);
    } 
  }
  values = values.sort((a, b) => a - b);
  let sum1 = 0
  for(let k =0;k<values.length;k++){
    sum1 = sum1 + values[k]
  }
  let median 
  let mid = Math.floor(values.length/2)
  if(values.length%2 == 0 ){
    median = (values[mid] + values[mid-1])/2

  }else{
    median = values[mid]
  }

  
  for(let g=0;g<values.length;g++){
    if(modefind_obj[values[g]]){
      modefind_obj[values[g]] =  modefind_obj[values[g]] + 1
    }else{
      modefind_obj[values[g]] =  1
    }
  }
  let mode = 1
  let final_mode = []
  Object.keys(modefind_obj).forEach(key => {
    let curr_value = modefind_obj[key]
    if(curr_value > mode){
      mode = curr_value
      final_mode = [Number(key)]
    }else if(curr_value === mode){
      final_mode.push(Number(key))
    }
  })
  final_mode = final_mode.sort((a, b) => a - b)
  if(final_mode.length === values.length){
    final_mode = 0
  }
  if(final_mode.length === 1){
    final_mode = final_mode[0]
  }
  let mean = (sum1/values.length).toFixed(3)
  mean = Number(mean)
  let maximum = values[values.length-1]
  let minimum = values[0]
  let range  = (maximum - (minimum)).toFixed(3)
  range = Number(range)
  let count = values.length
  sum1 = sum1.toFixed(3)
  sum1= Number(sum1)
  result =  {'mean': mean, 'median': median, 'mode': final_mode, 'range': range, 'minimum': minimum, 'maximum': maximum, 'count': count, 'sum': sum1}
  return result
};

export let nestedObjectsDiff = (obj1, obj2) => {
  //Code goes here
  const diff = {};
    if(typeof obj1!== 'object' && typeof obj2!== 'object'){
      throw 'Parameters passed should be an object'
    }
    if(!Object.keys(obj1).length > 0){
      throw 'Object should not be empty'
    }
    if(!Object.keys(obj2).length >0){
      throw 'Object should not be empty'
    }
    
  
    for (let i in obj2) {
    if (obj2.hasOwnProperty(i)) {
      const value2 = obj2[i];

      if (obj1.hasOwnProperty(i)) {
        const value1 = obj1[i];

        if (!Array.isArray(value1) && !Array.isArray(value2) && typeof value1 == 'object' &&  typeof value2 == 'object' && value1 !== null && value2 !== null) {
          const obj_diff = nestedObjectsDiff(value1, value2);
          if (Object.keys(obj_diff).length > 0) {
            diff[i] = obj_diff;
          }
        } else if (Array.isArray(value1) && Array.isArray(value2)) {
          if (JSON.stringify(value1) !== JSON.stringify(value2)) {
            diff[i] = value2;
          }
        } else if (value1!==value2) {
          diff[i] = value2;
        }
      } else {
        diff[i] = value2;
      }
    }
  }

  for (const j in obj1) {
    if (obj1.hasOwnProperty(j) && !obj2.hasOwnProperty(j)) {
      diff[j] = undefined;
    }
  }

  return diff;

};

export let mergeAndSumValues = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  let result = {}
  for(let i=0;i<args.length;i++){
    if(typeof args[i]!= 'object'){
      throw 'Argument should be of type object'
    }
  }
  for(let i=0;i<args.length;i++){
    if(Object.keys(args[i]).length === 0){
      throw 'Each object should have atleast one key value pair'
    }
  }
  let upval
  for(let j=0;j<args.length;j++){
    const curr_obj = args[j]
    for(let m in curr_obj){
      let val = curr_obj[m]
      if(typeof val === 'string'){
        val = val.trim()
        if(val===""){
          throw 'String inside the object should not be empty'
        }
        upval = Number(val)
      
      if (!isNaN(upval)) {
        val = upval
        
      }else{
        throw `Invalid value "${curr_obj[m]}" for key "${m}". Values must be numbers or strings that represent numbers.`;
      }
    }else if(typeof val!=='number'){
      throw `Invalid value "${curr_obj[m]}" for key "${m}". Values must be numbers or strings that represent numbers.`;

    }
      result[m] = (result[m] || 0) + val;
    }
  }

  return result
};

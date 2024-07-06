/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let swapChars = (string1, string2) => {
  //code goes here
  
  if(!string1){
    throw 'Input parameter string1 doesnot exist'
  }
  if(!string2){
    throw 'Input parameter string2 doesnot exist'
  }
  if(string1.length < 4){
    throw 'String1 should be of atleast 4 characters'
  }
  if(string2.length<4){
    throw 'String2 should be of atleast 4 characters'
  }

  if(typeof string1!== 'string'){
    throw 'Input should be of type string'
  }
  if(typeof string2!== 'string'){
    throw 'Input should be of type string'
  }
   string1 = string1.trim();
  string2 = string2.trim();
  if(string1 === '' || string2 === ''){
    throw 'String with only empty spaces is invalid'
  }
  let temp1 = "";
  let temp2 = "";
  for(let i=0;i<4;i++){
    temp2 += string1[i]
  }
  if(string2.length>4){
    for(let i=4;i<string2.length;i++){
      temp2 += string2[i];
    }
  }
  
  for(let j=0;j<4;j++){
     temp1 += string2[j];
  }
  if(string1.length>4){
    for(let j=4;j<string1.length;j++){
      temp1 += string1[j];
    }
  }
  
  const result = `${temp1} ${temp2}`
  return result
};

export let longestCommonSubstring = (str1, str2) => {
  //code goes here
 
  let result = ''
  if(!str1){
    throw 'Input parameter string1 doesnot exist'
  }
  if(!str2){
    throw 'Input parameter string2 doesnot exist'
  }
  if(typeof str1!== 'string'){
    throw 'Input should be of type string'
  }
  if(typeof str2!== 'string'){
    throw 'Input should be of type string'
  }
  if(!str1.trim() || !str2.trim()){
    throw 'String should contain alphanumeric characters, not only spaces'
  }
  if(str1.length<5){
    throw 'String1 should be of atleast 5  characters'
  }
  if(str2.length<5){
    throw 'String2 should be of atleast 5  characters'
  }
  
  str1 = str1.trim();
  str2 = str2.trim();
  for(let i=0;i<str1.length;i++){
    for(let j=0;j<str2.length;j++){
      let c1 = i;
      let c2 =j;
      let preresult = ''
      while(c1<str1.length && c2<str2.length && str1[c1] === str2[c2]){
        preresult = preresult + str1[c1]
        c1 = c1 + 1
        c2 = c2 + 1
      }
      if(preresult.length>result.length){
        result = preresult
      }
    }
  } 
  return `"${result}"`;
  
 
};

// Function to check palindrome string
let palindrome = (string_p) => {
  
  let string_p1 = ''
  const reg = /^[a-z0-9]+$/i
  for(let p=0;p<string_p.length;p++){
    if(reg.test(string_p[p])){
      string_p1 = string_p1 + string_p[p].toLowerCase()
    }
  }
  let i = 0
  let j = string_p1.length - 1
  while(i<j){
    if(string_p1[i] === string_p1[j]){
      i = i + 1
      j = j - 1 
    }else{
      return false
    }
    
  }
    return true
}

// Function to check isogram string
let isogram = (string_i) =>{
  let string_i1 = ''
  const reg = /^[a-z0-9]+$/i
  for(let p=0;p<string_i.length;p++){
    if(reg.test(string_i[p])){
      string_i1 = string_i1 + string_i[p].toLowerCase()
    }
  }
  const set1 = new Set()
  for(let k=0;k<string_i1.length;k++){
    set1.add(string_i1[k])
  }
  return set1.size === string_i1.length
}

export let palindromeOrIsogram = (arrStrings) => {
  //code goes here
  let result = {}
  if(!Array.isArray(arrStrings)){
    throw 'Parameter passed should be of type Array'
  }
  for(let i=0;i<arrStrings.length;i++){
    if(typeof arrStrings[i]!= 'string'){
      throw 'Parameters inside of array should be of type strings only'
    }
  }
  for(let i=0;i<arrStrings.length;i++){
    if(arrStrings[i] == ''){
      throw 'Strings inside array should not be empty'
    }
  }
  for(let i=0;i<arrStrings.length;i++){
    if(!arrStrings[i].trim()){
      throw 'Strings inside array should not contain only empty spaces'
    }
  }
  if(arrStrings.length<2){
    throw 'Array should contain atleast 2 elements'
  }
    for(let m=0;m<arrStrings.length;m++){
      if(palindrome(arrStrings[m]) && isogram(arrStrings[m])){
        result[arrStrings[m]] = "Both"
      }
      else if(palindrome(arrStrings[m])){
        result[arrStrings[m]] = "Palindrome"
      }
      else if(isogram(arrStrings[m])){
        result[arrStrings[m]] = "Isogram"
      }
      else{
        result[arrStrings[m]] = "Neither"
      }
    }
    return result;
  };



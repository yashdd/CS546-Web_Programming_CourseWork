
export const questionOne = (index) => {
  // Implement question 1 here
  let tot = 0 
  let x = 0;
  let y = 1;
  if(index == 1){
    return 1;
  }
  else if(index == 0){
    return 0;
  }
  else{
    for(var i =2;i<=index;i++){
      tot = x+y;
      x=y;
      y=tot;
    }
  }
      return tot;
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  if(!arr){
    return {};
  }
  
  let prime_or_not = {};
  
  arr.forEach((val) => { 
    let flag = true
      if(val <= 1){
        prime_or_not[val] = 'false';
      }else if(val === 2){
        prime_or_not[val] = 'true';
      }else if(val%2===0){
        prime_or_not[val] = 'false';
      }else{
        for(var i = 2;i<=val/2;i++){
          if(val%i == 0){
            prime_or_not[val] = 'false'
            flag = false
            break
          }
        }
          if(flag == true){
            prime_or_not[val] = 'true'
          }
      }
  })

  return prime_or_not
};

export const questionThree = (str) => {
  // Implement question 3 here
  let count_of_types = {
    consonants: 0,
    vowels: 0,
    numbers: 0,
    spaces: 0,
    punctuations: 0,
    specialCharacters: 0
  }
  if(!str){
    
    return count_of_types
  }
  const cosnonant = "bcdfghjklmnpqrstuvwxyzBCDFGHJKLMNPQRSTUVWXYZ"
  const vowel = "aeiouAEIOU"
  const numbers= "1234567890"
  const special_chars = "+-/*%=[]{}()$&^@#"
  const punctuations = "?!\"\':;.,";
  let consonant_count = 0
  let vowel_count = 0
  let spaces_count = 0
  let numbers_count = 0
  let punctuations_count = 0
  let special_chars_count = 0

  for(var i=0;i<str.length;i++){
    if(vowel.includes(str[i])){
      vowel_count+=1
    }else if(cosnonant.includes(str[i])){
      consonant_count+=1
    }else if(numbers.includes(str[i])){
      numbers_count+=1
    }else if(special_chars.includes(str[i])){
      special_chars_count+=1
    }else if(punctuations.includes(str[i])){
      punctuations_count +=1
    }else if(str[i] == " "){
      spaces_count+=1
    }
  }
  count_of_types.consonants = consonant_count
  count_of_types.vowels = vowel_count
  count_of_types.numbers = numbers_count 
  count_of_types.spaces = spaces_count
  count_of_types.punctuations = punctuations_count
  count_of_types.specialCharacters = special_chars_count 
  
  return count_of_types;
  
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let result = []
  if(!arr){
    return [];
  }
  for(var i=0;i<arr.length;i++){
    if(result.find((a) => a === arr[i])){
         
    }else{

        result.push(arr[i]);
    }
  }
  return result;
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'YASH',
  lastName: 'DESHPANDE',
  studentId: '20025089'
};


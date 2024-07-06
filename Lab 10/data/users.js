import { type } from "os";
import bcrypt from 'bcryptjs'
import { users } from "../config/mongoCollections.js";
//import mongo collections, bcrypt and implement the following data functions
export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
    if(!firstName || !lastName || !username || !password || !favoriteQuote || !themePreference || !role){
      throw 'Some fields missing'
    }
    if(typeof firstName!== 'string' || typeof lastName!== 'string' || typeof username!== 'string' ||
        typeof password!== 'string' || typeof favoriteQuote!== 'string' || typeof themePreference!== 'string' || typeof role!== 'string')
    {
          throw 'Some fields are not strings'
    }
    if(firstName.trim() === '' || lastName.trim() === '' ||  username.trim() === '' ||
        password.trim() === '' || favoriteQuote.trim() === '' || themePreference.trim()== '' || 
        role.trim() === '')
    {
          throw 'Some fields are just spaces'
    }
    if(firstName.length<2 || firstName.length>25){
        throw 'First name should be more than 2 characters and less than 25 characters'
    }
    if(lastName.length<2 || lastName.length>25){
      throw 'Last name should be more than 2 characters and less than 25 characters'
    }
    if(username.length<5 || username.length>10){
      throw 'Username should be more than 5 characters and less than 10 characters'
    }
    if(/\d/.test(firstName) || /\d/.test(lastName) || /\d/.test(username)){
      throw 'Firstname, Lastname, Username should not contain numbers'
    }
    
    const user = await users()
    const exisitng_user = await user.findOne({username: username });
    if(exisitng_user){
      throw ' This username already exists'
    }
    if(password.trim().length<8){
      throw 'Password must be minimum 8 characters'
    }
    for(let i=0;i<password.length;i++){
      if(password[i] == ' '){
        throw 'Password Must not contain a spcae'
      }
    }
    if(!/[A-Z]/.test(password) || !/\d/.test(password)){
        throw 'Password should contain atleast one uppercase character and one number'
    }
    if(!/[^a-zA-Z0-9\s]/.test(password)){
      throw 'Should contain atleast one special character'
    }
    if(favoriteQuote.length<20 || favoriteQuote.length>255){
      throw 'Should contain more than 20 and less than 255 characters'
    }
    let themes = ['light','dark'];
    if(!themes.includes(themePreference)){
      throw 'Theme Preference can only be light or dark'
    }

    let roles = ['admin','user'];
    if(!roles.includes(role)){
      throw 'Role can only be admin or user'
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const data_to_insert = {
  
    firstName: firstName,
    lastName: lastName,  
    username: username, 
    password: hash,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role
    
    }

    const insertUser = await user.insertOne(data_to_insert);
    if(!insertUser){
      throw 'User Data Insertion Failed'
    }
    return {signupCompleted: true}
};

export const loginUser = async (username, password) => {
  if(!username || !password){
    throw 'Username or Password not provided'
  }
  if(typeof username!== 'string' || typeof password!=='string'){
    throw 'Username or Password not provided'
  }
  if(username.trim()=== "" || password.trim()===""){
    throw 'String should not contain only spaces'
  }
  const user = await users();
  const current_user = await user.findOne({username: username.toLowerCase()})

  if(!current_user){
    throw 'User with this username not found'
  }
  const password_verification = await bcrypt.compare(password,current_user.password);
  if(!password_verification){
    throw 'Invalid Username or Password'
  }
    return current_user;

};

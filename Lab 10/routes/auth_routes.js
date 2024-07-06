//import express, express router as shown in lecture code
import express from 'express'
import session from 'express-session';
import {registerUser,loginUser} from "../data/users.js"
import {Router} from 'express';
import { users } from "../config/mongoCollections.js";

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render('register',{title:"Register"});
  } catch (error) {
      res.status(500).json(error);
  }
  })
  .post(async (req, res) => {
    try{
    const user_info = req.body;
  //  console.log(req.body)
    if(!user_info.firstName || !user_info.lastName || !user_info.username || !user_info.password || 
      !user_info.favoriteQuote || !user_info.themePreference || !user_info.role){
        return res.status(400).json({error : 'Some fields missing'})
    }
    if(typeof user_info.firstName!== 'string' || typeof user_info.lastName!== 'string' || typeof user_info.username!== 'string' ||
        typeof user_info.password!== 'string' || typeof user_info.favoriteQuote!== 'string' || typeof user_info.themePreference!== 'string' || typeof user_info.role!== 'string')
    {
        return res.status(400).json({error : 'Some fields are not strings'})
    }
    if(user_info.firstName.trim() === '' || user_info.lastName.trim() === '' ||  user_info.username.trim() === '' ||
    user_info.password.trim() === '' || user_info.favoriteQuote.trim() === '' || user_info.themePreference.trim()== '' || 
    user_info.role.trim() === '')
    {
        return res.status(400).json({error : 'Some fields are just spaces'})
    }
    if (/[^a-zA-Z0-9\s]/.test(user_info.firstName)) {
      return res.status(400).json({ error: 'Names and Usernames should not contain any special characters' });
  }
  if (/[^a-zA-Z0-9\s]/.test(user_info.lastName)) {
    return res.status(400).json({ error: 'Names and Usernames should not contain any special characters' });
    }
    if (/[^a-zA-Z0-9\s]/.test(user_info.username)) {
      return res.status(400).json({ error: 'Names and Usernames should not contain any special characters' });
      }
    if(user_info.firstName.length<2 || user_info.firstName.length>25){
        
      return res.status(400).json({error : 'First name should be more than 2 characters and less than 25 characters'})
    }
    if(user_info.lastName.length<2 || user_info.lastName.length>25){
      return res.status(400).json({error : 'Last name should be more than 2 characters and less than 25 characters'})
    }
    if(user_info.username.length<5 || user_info.username.length>10){
      return res.status(400).json({error : 'Username should be more than 5 characters and less than 10 characters'})
    }
    if(/\d/.test(user_info.firstName) || /\d/.test(user_info.lastName) || /\d/.test(user_info.username)){
      return res.status(400).json({error : 'First Name, Last Name, Username should not contain a number'})
    }
    user_info.firstName = user_info.firstName.trim();
    user_info.lastName = user_info.lastName.trim();
    user_info.username = user_info.username.trim();
    user_info.username = user_info.username.toLowerCase();
   
    if(user_info.password.trim().length<8){
      return res.status(400).json({error : 'Password must be minimum 8 characters'})
    }
    for(let i=0;i<user_info.password.length;i++){
      if(user_info.password[i] == ' '){
        return res.status(400).json({error : 'Password Must not contain a spcae'})

      }
    }
    if(!/[A-Z]/.test(user_info.password) || !/\d/.test(user_info.password)){
      return res.status(400).json({error : 'Password should contain atleast one uppercase character and one number'})
    }
    if(!/[^a-zA-Z0-9\s]/.test(user_info.password)){
      return res.status(400).json({error : 'Should contain atleast one special character'})
    }
    user_info.favoriteQuote = user_info.favoriteQuote.trim()
    if(user_info.favoriteQuote.length<20 || user_info.favoriteQuote.length>255){
      return res.status(400).json({error : 'Should contain more than 20 and less than 255 characters'})
    }
    
    user_info.themePreference = user_info.themePreference.toLowerCase();
    user_info.themePreference = user_info.themePreference.trim();
    let themes = ['light','dark'];
    if(!themes.includes(user_info.themePreference)){
      return res.status(400).json({error : 'Theme Preference can only be light or dark'})
    }
    user_info.role = user_info.role.toLowerCase();
    user_info.role = user_info.role.trim();
    let roles = ['admin','user'];
    if(!roles.includes(user_info.role)){
      return res.status(400).json({error : 'Role can only be admin or user'})
    }

    if(user_info.password!== user_info.confirmpassword){
      return res.status(400).json({error : 'Passwords Mismatching. it should be same'})
    }
    const insert_user = await registerUser(user_info.firstName,
      user_info.lastName,
      user_info.username,
      user_info.password,
      user_info.favoriteQuote,
      user_info.themePreference,
      user_info.role);
      if(insert_user){
        res.redirect("/login");
      }else{
        res.status(500).json({error : 'Insert failed'})
      }
      
    }catch{
      res.status(500).json({error : 'Insert failed'})
    }
  });


router
  .route('/login')
  .get(async (req, res) => {
    try {
      res.render('login',{title:"Login"});
  } catch (error) {
      res.status(500).json(error);
  }
  })
  .post(async (req, res) => {
    //code here for POST
    try{
    const login_info = req.body;
    if(!login_info.username || !login_info.password){
      res.status(400).json({error:'Some fields are missing'})
    }
    if(typeof login_info.username!== 'string' || typeof login_info.password!== 'string'){
      res.status(400).json({error:'Some fields are not strings'})
    }
    if(login_info.username.trim() === "" || login_info.password.trim() === ""){
      return res.status(400).json({error : 'Username or password cannot be just empty spaces'});
    }
    login_info.username = login_info.username.trim();
    login_info.username = login_info.username.toLowerCase();
    if(login_info.username.length<5 || login_info.username.length>10){
      return res.status(400).json({error : 'Username should be more than 5 characters and less than 10 characters'})
    }
    if(login_info.password.trim().length<8){
      return res.status(400).json({error : 'Password must be minimum 8 characters'})
    }
    for(let i=0;i<login_info.password.length;i++){
      if(login_info.password[i] == ' '){
        return res.status(400).json({error : 'Password Must not contain a spcae'})

      }
    }
    if(!/[A-Z]/.test(login_info.password) || !/\d/.test(login_info.password)){
      return res.status(400).json({error : 'Password should contain atleast one uppercase character and one number'})
    }
    if(!/[^a-zA-Z0-9\s]/.test(login_info.password)){
      return res.status(400).json({error : 'Should contain atleast one special character'})
    }

    const user_coll = await users();
    const current_user = await user_coll.findOne({username: login_info.username.toLowerCase()})
    if(!current_user){
      return res.status(400).json({error : 'Should contain atleast one special character'})
    }
    const user = await loginUser(login_info.username,login_info.password)
    if(!user){
      return res.status(400).json({error : 'Invalid Username and Password'})
    }
    req.session.user = {  firstName: user.firstName, 
    lastName: user.lastName, username: user.username, 
    favoriteQuote: user.favoriteQuote, 
    themePreference: user.themePreference, role: user.role  }
    
    if(user.role === "admin"){
      res.redirect("/admin")
    }else if(user.role === "user"){
      res.redirect("/user")
    }
  }catch(error){
    res.status(500).json(error)
  }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  try{
  if(req.session.user){
    
    const currentTime = new Date().toLocaleTimeString();
    let admin = false;
    if(req.session.user.role==="admin"){
      admin = true;
    }
    res.render('user',{firstName:req.session.user.firstName,lastName: req.session.user.lastName
      ,favoriteQuote:req.session.user.favoriteQuote,currentTime,role: req.session.user.role,admin_bool:admin,
      themePreference:req.session.user.themePreference,title:"User Dashboard"})
  }
}catch(error){
    res.status(500).json(error)
}
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  try{
    if(req.session.user && req.session.user.role === "admin"){
     
      const currentTime = new Date().toLocaleTimeString();
      res.render('admin',{firstName:req.session.user.firstName,lastName: req.session.user.lastName
        ,favoriteQuote:req.session.user.favoriteQuote,currentTime,role: req.session.user.role,
        themePreference:req.session.user.themePreference, title:"Admin Dashboard" })
    }
  }catch(error){
      res.status(500).json(error)
  }
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
  
});

export default router;
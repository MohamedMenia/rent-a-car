
const User=require('../model/userModel')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

const customFields={
  usernameField:"email",
  passwordField:"password"
}

passport.use("user",new LocalStrategy(customFields,(email,password,done)=>{
  User.findOne({email},(err,user)=>{
      if(err){
          return done(err)
      };
      
      if(!user){
          return done(null,false,{message:"Email Doesn't Exist"})
      };
      
      bcrypt.compare(password,user.password,function(err,result){
          if(result){
              return done(null,user)
          }else{
              return done(null,false,{message:"Password Incorrect"})
          }
      })
  })
}))

//passport serialization && deserialization
passport.serializeUser(function (user,done)
{  console.log('OK')
  done(null,user)});

passport.deserializeUser((user,done)=>{
 // console.log(user)
 
  User.findById({_id:user._id},function(err,user){
      if(err){
          console.log(err.message)
      }
  return done(err,user)
  
  
  })
  }
)
  module.exports = passport
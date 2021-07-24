const passport = require("passport");
const session = require("express-session");
const flash = require('express-flash');
const controller=require('../controller/controller')


const express =require('express')
const app=express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
   secret: "secret",
   resave: true,
   saveUninitialized: true ,
    cookie: { maxAge: 600000000000 }
  
  }))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.post("/signup",controller.sginupPOST)

app.post('/login',function(req,res,next){
  passport.authenticate("user",{
    successRedirect:"/profile",
    failureRedirect:"/login",
    failureFlash:true
  })(req,res,next)});

  app.post("/profile",controller.profile)
  app.post("/addcar",controller.addcar)
app.post('/car/car',controller.carpost);

  app.get("/profile",controller.profileGet)
app.get("/signup",controller.sginupGET)
app.get("/",controller.mainPage)
app.get('/car/:id',controller.car);
app.get("/login",controller.loginGET)

module.exports= app;
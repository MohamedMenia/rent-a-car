const { findOneAndUpdate } = require("../model/userModel");
const User = require("../model/userModel");
mongoose=require("mongoose")
const CarModel=require("../model/carModel")
let acceptmassage=''
module.exports.sginupPOST=(req,res)=>{
   console.log(req.body)
   const user =new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    phonenumber:req.body.phonenumber,
    password:req.body.password,
    address:req.body.address
   }).save(err=>{
    if(err){
   
        res.redirect("/signup")
      
    }

    else
    res.redirect('/login')
})


   
}
module.exports.profile=(req,res)=>{
    console.log(req.body)
    console.log(req.user)
    User.findOneAndUpdate({_id:req.user._id},{
        firstname:req.body.firstname||req.user.firstname,
        lastname:req.body.lastname||req.user.lastname,
        email:req.body.email||req.user.email,
        phonenumber:req.body.phonenumber||req.user.phonenumber,
        address:req.body.address||req.user.address

    },(err,data)=>{
        if(err)
     
       console.log(err)
    })

    res.redirect('/profile')
}
module.exports.addcar=(req,res)=>{
    console.log(req.body)
    const car =new CarModel({
        carname:req.body.carname,
    carbrand:req.body.carbrand,
    carspecs:req.body.carspecs,
    carPricePerDay:req.body.carPricePerDay,
    carImg:req.body.carimg,
    userID:req.body.userid
    }).save(err=>{
        if(err){
            acceptmassage="error"
        }
        else
        acceptmassage="carr have been added"
        res.redirect('/profile')
    })
}
module.exports.carpost= (req, res) =>{
    console.log(req.body)
    CarModel.findOneAndUpdate({_id:req.body.carID},{
      $push: { rentedDays: req.body.days }},(err,car)=>{
          if(err)
          console.log(err)
         console.log(car)
         
     }) 
       
     res.redirect('/')
 
 
 }

module.exports.profileGet=(req,res)=>{
    res.render("../views/profile.ejs",{user:req.user,massage:acceptmassage})
    acceptmassage=''
}
module.exports.sginupGET=(req,res)=>{
    res.render("../views/signup.ejs")
}
module.exports.mainPage=(req,res)=>{
    brandlist=[];
    CarModel.find({},(err,data)=>{
        data.forEach(element => {
            let check=false;
            brandlist.forEach(brand=>{
                if(element.carbrand==brand){
                    check=true;
                    
                }


            })
            if(!check)
            brandlist.push(element.carbrand)

            
        });

        res.render("../views/mainPage.ejs",{data,brandlist})
    })
}

module.exports.loginGET=(req,res)=>{
    res.render("../views/login.ejs")
}
module.exports.car= (req, res) =>{
    if(req.user){
    logeduser=req.user
    carid=req.params['id']
    CarModel.findOne({_id:carid},(err,car)=>{
        User.findOne({_id:car.userID},(err,user)=>{
            console.log(user)

            res.render('../views/car.ejs',{car,logeduser,user,rentedDays:car.rentedDays})
        })
      
    })
    }
    else 
    res.redirect("/login")
    
  };
  
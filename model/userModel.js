const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt')

const userSchema= new Schema({
firstname:{type:String},
lastname:{type:String},
email:{type:String,index: { unique: [true,"email already exists"]}},
phonenumber:{type:String},
password:{type:String},
address:{type:String}

})
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
        this.password=await bcrypt.hash(this.password,salt)
        next()
    });

const User=mongoose.model("user",userSchema)
module.exports=User;
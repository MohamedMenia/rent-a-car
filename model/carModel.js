const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const carSchema= new Schema({
    carname:{type:String},
    carbrand:{type:String},
    carspecs:{type:String},
    carPricePerDay:{type:Number},
    carImg:{type:String},
    rentedDays:[{type:String}],
    userID:{type:String}

})



const car=mongoose.model("car",carSchema)
module.exports=car;
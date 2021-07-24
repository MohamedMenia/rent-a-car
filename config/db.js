const mongoose = require("mongoose");

let _dbURL = "mongodb+srv://menia_senpai:mohamed1999menia@cluster0.5cjv7.gcp.mongodb.net/rentcar?retryWrites=true&w=majority"


let _dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(_dbURL,_dbOptions)

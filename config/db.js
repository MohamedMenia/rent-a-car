const mongoose = require("mongoose");

let _dbURL =""


let _dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(_dbURL,_dbOptions)

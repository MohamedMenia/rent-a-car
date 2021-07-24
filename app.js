
const express= require('express')
const app=express()
const path = require('path');

require("./config/db")
require("./config/passport")

const routes=require("./routes/routes")

app.use(express.urlencoded({extended: true} ))
app.use(express.json())
app.use(express.static(path.join(__dirname)));



app.set('view engine', 'ejs')

app.use(routes)
app.listen(8000, function(){
    console.log('server is runing');
});


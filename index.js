const express = require("express") ;
const app = express () ;

require("dotenv").config() ;

const Port = process.env.PORT || 4000 ;

app.use(express.json()) ;

const route = require("./routes/user") ;

app.use("/api/v1" , route) ;

const dbconnect = require("./config/database") ;

dbconnect () ;

app.listen(Port , ()=>{
    console.log("server has started ") ;
})
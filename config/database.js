const mongoose = require("mongoose") ;

require("dotenv").config() ;

 const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL ,{
     useNewUrlParser :true ,
     useUnifiedTopology: true
    })
    .then(()=>{console.log("DB connected successfully")})
    .catch((error)=>{
        console.log("db is not connected") ;
        console.error(error) ;
        process.exit(1) ;
    })
}

module.exports = dbconnect ;
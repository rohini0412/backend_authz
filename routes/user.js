const express = require("express") ;
const router = express.Router(); 

const{login , signup} = require("../controller/auth") ;
const {auth ,isAdmin , isStudent} = require("../middleware/Auth") ;

router.post("/login" ,login) ;
router.post("/signup" , signup) ;

router.get("/test" , auth , (req,res)=>{
    res.json({
        success : true ,
        message :"welcome to test route" ,
    })
})

router.get("/admin" , auth , isAdmin , (req,res)=>{
    res.json({
        success : true ,
        message :"welcome to admin route" ,
    })
})

router.get("/student" , auth ,isStudent, (req,res)=>{
    res.json({
        success : true ,
        message :"welcome to student route" ,
    })
})



module.exports = router ;
 

const express=require("express")
const { userRegisterController, userLoginController } = require("./controller/userController")

const router=express.Router()

//register
router.post("/register",userRegisterController)
//login
router.post("/login",userLoginController) 



module.exports=router
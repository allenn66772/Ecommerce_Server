const express=require("express")
const { userRegisterController, userLoginController } = require("./controller/userController")
const { addProductscontroller } = require("./controller/productController")
const multerConfig = require("./Middleware/imageMulterMiddleware")

const router=express.Router()

//register
router.post("/register",userRegisterController)
//login
router.post("/login",userLoginController) 







//Admin

//add Products
router.post("/add-products",multerConfig.array("uploadImages",3),addProductscontroller)



module.exports=router
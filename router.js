const express=require("express")
const { userRegisterController, userLoginController } = require("./controller/userController")
const { addProductscontroller, getHomeProductController, getAllProductsController, getAProductController } = require("./controller/productController")
const multerConfig = require("./Middleware/imageMulterMiddleware")
const jwtMiddleware = require("./Middleware/jwtMiddleware")
const { addToCartController } = require("./controller/cartController")

const router=express.Router()

//register
router.post("/register",userRegisterController)
//login
router.post("/login",userLoginController) 


//user
//home products
router.get("/home-products",jwtMiddleware,getHomeProductController)
//get all Products
router.get("/all-products",jwtMiddleware,getAllProductsController)
// view product
router.get("/view-product/:id",jwtMiddleware,getAProductController)
//add to cart
router.post("/add-to-cart",jwtMiddleware,addToCartController)



//Admin

//add Products
router.post("/add-products",multerConfig.array("uploadImages",3),addProductscontroller)



module.exports=router
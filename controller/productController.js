const express=require("express");
const products = require("../model/productModel");

//Add Products
exports.addProductscontroller=async(req,res)=>{
    console.log("Inside Add Product controller");

    const {pname,description,productDesc,price,dprice,discount,highlights,color}=req.body
    console.log(pname,description,productDesc,price,dprice,discount,highlights,color);

    try {
         const newProduct=new products({pname,description,productDesc,price,dprice,discount,highlights,color})
          await newProduct.save()
          res.status(200).json(newProduct)




    } catch (error) {
        res.status(500).json(error)
        
    }
    
    
}
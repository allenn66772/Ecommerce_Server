const express=require("express");
const products = require("../model/productModel");

//Add Products
exports.addProductscontroller = async (req, res) => {
  console.log("Inside Add Product controller");

  const {pname,description,productDesc,price,dprice,discount,highlights}=req.body;

  console.log(pname,description,productDesc,price,dprice,discount,highlights);

  var uploadImages=[];
  req.files.map((item)=>uploadImages.push(item.filename))

  try {
    const newProduct = new products({
      pname,description,uploadImages,productDesc,price,dprice,discount,highlights});

    await newProduct.save();
    res.status(200).json(newProduct);

  } catch (error) {
    res.status(500).json(error);
  }
};
//get products in home controller
exports.getHomeProductController=async(req,res)=>{
  console.log("Inside get all products in hom controller");

  try{
      const homeFoods=await products.find().sort({_id:-1}).limit(3)
      res.status(200).json(homeFoods)



  }catch(error){
    res.status(500).json(error)
  }
  
}
//get all product controller
exports.getAllProductsController=async(req,res)=>{
  console.log("Inside Get All Products controller");

  try {

const searchKey = req.query.search || "";
    

    const query = searchKey
      ? { foodname: { $regex: searchKey, $options: "i" } }
      : {};

    const allProducts=await products.find(query)
    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).json(error)
  }
  
}
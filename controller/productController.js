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

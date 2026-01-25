const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uploadImages: {
    type: Array,
    required: true,
  },
    productDesc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    dprice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    highlights:{
        type:[String],
        required:true
    }
})

const products=mongoose.model("products",productSchema)
module.exports=products
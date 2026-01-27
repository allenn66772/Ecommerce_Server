const mongoose =require("mongoose")

const cartSchema=new mongoose.Schema(
    {
        userMail:{
            type:String,
            required:true,
            unique:true

        },
        status:{
            type:String,
            default:"pending"
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products",
                    required:true
                },
                quantity:{
                    type:Number,
                    default:1 
                },
            },
        ],
    },
    {timestamps:true}
)

const carts=mongoose.model("carts",cartSchema)
module.exports=carts;
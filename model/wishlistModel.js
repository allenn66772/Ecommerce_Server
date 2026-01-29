const mongoose=require("mongoose")

const wishlistSchema=new mongoose.Schema(
    {
        userMail:{
            type:String,
            required:true,
            unique:true
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products",
                    required:true
                }
            }
        ]
    },
    {timestamps:true}
)

const wishlists=mongoose.model("wishlists",wishlistSchema)
module.exports=wishlists
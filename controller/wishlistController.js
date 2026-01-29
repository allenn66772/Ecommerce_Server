const wishlists = require("../model/wishlistModel");


//add to wishlist
exports.addToWishlistController=async(req,res)=>{
 console.log("Inside add to wishlist controller");
 try{
   const {productId}=req.body
   const userMail=req.payload
   let wishlist=await wishlists.findOne({userMail})
    // if wishlist not exist create one
    if(!wishlist){
        wishlist=new wishlists({
            userMail,items:[{productId}]
        })
    }else{
        //check if product already exist
        const exists=wishlist.items.find((item)=>item.productId.toString()===productId)

       if(exists){
        return res.status(400).json("Product already exist in wishlist")
       }
       wishlist.items.push({productId})
    }
    await wishlist.save()
    res.status(200).json(wishlist)




 }catch(error){
  res.status(500).json(error)
 }

 
}



// GET WISHLIST
exports.getWishlistController = async (req, res) => {
  try {
    const userMail = req.payload;

    const wishlist = await wishlists
      .findOne({ userMail })
      .populate("items.productId");

    if (!wishlist) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json(error);
  }
};





// remove from wishlist \\
exports.removeFromWishlit=async(req,res)=>{
    console.log("Inside reomve from wishlist controller");
    try {
        const userMail=req.payload
        const {productId}=req.params

        const wishlist=await wishlists.findOne({userMail})
        if (!wishlist) return res.status(404).json("Wishlist not found");

    wishlist.items = wishlist.items.filter(
      item => item.productId != productId
    );

    await wishlist.save();
    res.status(200).json(wishlist);
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const carts=require("../model/cartModel");
const users = require("../model/userModel");




// add to cart
exports.addToCartController = async (req, res) => {
  console.log("Inside add to cart controller");

  try {
    const { productId, quantity } = req.body;
    const userMail = req.payload;

    // check if user exists
    const user = await users.findOne({ email: userMail });
    if (!user) {
      return res.status(404).json("User doesn't exist, please login");
    }

    // find user's cart
    let addcart = await carts.findOne({ userMail });

    
    let existingItem;

    if (!addcart) {
      // create new cart
      addcart = new carts({
        userMail,
        items: [{ productId, quantity }]
      });
    } else {
      // check if item already exists
      existingItem = addcart.items.find(
        item => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        addcart.items.push({ productId, quantity });
      }
    }

    await addcart.save();
    res.status(200).json(addcart);

  } catch (error) {
    res.status(500).json(error);
  }
};

///get from cart
exports.getFromCartController=async(req,res)=>{
  console.log("Inside Get From Cart Controller");
  try {
    const userMail=req.payload

     const cart=await carts.findOne({userMail}).populate("items.productId")
     res.status(200).json(cart.items) 
  } catch (error) {
    res.status(500).json(error)
  }
}
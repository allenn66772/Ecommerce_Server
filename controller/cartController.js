
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

     if (!cart) {
      return res.status(200).json([]); // no cart yet
    }

     res.status(200).json(cart.items) 
  } catch (error) {
    res.status(500).json(error)
  }
}

// update product quantity 
exports.updateProductQuantity = async (req, res) => {
  console.log("Inside Update Product Quantity");

  try {
    const userMail = req.payload;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json("Quantity must not be less than 1");
    }

    const cart = await carts.findOne({ userMail });
    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId._id
          ? item.productId._id.toString() === productId
          : item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json("Product not in cart");
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
//remove item from cart

exports.removeFromCart=async(req,res)=>{
  console.log("Inside Remove From Cart");

  try { 
    const userMail=req.payload
    const {productId}=req.params

    //find cart and remove item
    const cart=await carts.findOneAndUpdate(
      {userMail},
      {
        $pull:{
          items:{productId},
        },
      },
      {new:true}
    ).populate("items.productId")

    if(!cart){
      return res.status(404).json("Cart not found")
    }
    res.status(200).json(cart.items)
    
  } catch (error) {
    res.status(500).json(error)
  }
  

}
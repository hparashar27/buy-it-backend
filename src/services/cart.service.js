const Cart = require("../models/Cart.model");
const CartItem = require("../models/CartItem.model");
const Product  = require("../models/Product.model")

const findUserCart = async (userId) => {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }

        // Find the cart items and populate the product details
        const cartItem = await CartItem.find({ cart: cart._id }).populate('product');
        console.log(cartItem)
        // Assign the populated cart items to the cart object
        cart.cartItems = cartItem;

        // Initialize totals
        let totalItem = 0;
        let totalDiscount = 0;
        let totalPrice = 0;

        // Calculate the totals
        for (let cartIt of cartItem) {
            totalItem += cartIt.quantity;
            totalDiscount += cartIt.discountedPrice * cartIt.quantity;
            totalPrice += cartIt.price * cartIt.quantity;
        }

        // Assign totals to the cart object
        
        cart.totalItem = totalItem;
        cart.totalPrice = totalPrice;
        cart.discount = totalDiscount;
        cart.totalDiscountedPrice = totalPrice - totalDiscount ;
        

        console.log("Cart retrieved:",cart);
        return cart;
    } catch (error) {
        console.error("Error in findUserCart:", error.message);
        throw new Error(error.message);
    }
};


const addCartItem = async(userId, req) => {
    try {
      // Find the cart for the user
      let cart = await Cart.findOne({ user: userId });
  
      // If no cart is found, create a new one
      if (!cart) {
        cart = new Cart({ user: userId });
        cart = await cart.save();
      }
  
      // Find the product by ID
      const product = await Product.findById(req.productId);
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      // Check if the item is already in the cart
      const isPresent = await CartItem.findOne({
        product: product._id,
        userId: userId,
        cart: cart._id
      });
  
      // If the item is not in the cart, add it
      if (!isPresent) {
        const cartItem = new CartItem({
          product: product._id,
          cart: cart._id,
          userId: userId,
          price: product.price,
          quantity: 1,
          discountedPrice: product.discountedPrice,
          size: req.size,
        });
  
        const createdCartItem = await cartItem.save();
        cart.cartItems.push(createdCartItem);
        await cart.save();
  
        return "Item added to the cart successfully";
      } else {
        return "Item is already in the cart";
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
    
  

module.exports = {findUserCart,addCartItem};
const userService =  require("../services/user.service");
const cartService = require("../services/cart.service");
const CartItem = require("../models/CartItem.model");
const Cart = require("../models/Cart.model");

const findCartItemById = async(cartItemId) =>{
    try{
   const cartItem = await CartItem.findById(cartItemId).populate("product"); //doubt
   return cartItem;
    }catch(error){
        throw new Error(error.message);
    }
}

const updateCartItem = async(userId,cartItemId,cartItemData) =>{
try{
const item = await findCartItemById(cartItemId);
const user = await userService.findUserById(item.userId);

if(!user){
    throw new Error("User do not exist");
}

if(!item){
    throw new Error("item do not exist");
}

if(user._id.toString() == userId.toString()){
    item.quantity = cartItemData.quantity,
    item.price = item.quantity*item.product.price;
    item.discountedPrice = item.quantity*item.product.discountedPrice;
    const updateCartIt = await item.save();
    return updateCartIt;
}
}catch(error){
    throw new Error("item do not updated !");
}
}

const removeCartItem = async(userId,cartItemId) =>{
try{

const cartItem = await findCartItemById(cartItemId);
const user = await userService.findUserById(userId);

if(user._id.toString() === cartItem.userId.toString()){
 await CartItem.findByIdAndDelete(cartItemId);
}
}catch(error){
    throw new Error("item can not be deleted !");
}
}

module.exports = {findCartItemById,updateCartItem,removeCartItem}
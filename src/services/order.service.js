const cartService = require("../services/cart.service");
const userService = require("../services/user.service");
const Address =  require('../models/Address.model')
const Order = require("../models/Order.model");
const OrderItem = require("../models/OrderItems.model");


const createOrder = async(user,shippingAddress)=>{
    try{
 let address ;
 console.log(shippingAddress)
 if(shippingAddress._id){
    let existAddress = await Address.findById(shippingAddress._id) //doubt
    address = existAddress;
 }else{
    const address = new Address(shippingAddress);
    address.user = user;
    await address.save();
    user.address.push(address);
    await user.save();
}

const cart = await cartService.findUserCart(user._id);
const orderItems = [];

for(const item of cart.cartItems){
const orderItem = new OrderItem({
price:item.price,
product:item.product,
quantity: item.quantity,
size:item.size,
discountedPrice : item.discountedPrice,
userId :item.userId
});

const createdOrderItem = await orderItem.save();
orderItems.push(createdOrderItem);
}

const createOrder = new Order({
    user,
    orderItems,
    totalPrice : cart.totalPrice, //doubt in totalPrice may be it will be paymentDetails.totalPrice 
    totalDiscountedPrice :cart.totalDiscountedPrice,
    totalItem:cart.totalItem,
    discount:cart.discount,
    shippingAddress :address,
    orderStatus : "CREATED"
    
})

const saveOrder = await createOrder.save();
return saveOrder;

    }catch(error){
throw new Error(error.message);
    }
}

const findOrderById = async(orderId) =>{
    try{
   const order = Order.findById(orderId).
   populate({path:"user",populate:{path:"address"}}).populate({path:"orderItems",populate:{path:"product"}});

return order;
    }catch(error){
        throw new Error(error.message);
    }
}

const orderPlaced = async(orderId) =>{
    try{
        const order = await findOrderById(orderId);
        order.paymentStatus = "COMPLETED",
        order.orderStatus = "PLACED"
        return  await order.save();
    }catch(error){
 throw new Error(error.message);
    }
}

const orderConfirmed = async(orderId) =>{
    try{
        const order = await findOrderById(orderId);
        order.paymentStatus = "COMPLETED",
        order.orderStatus = "CONFIRMED"
        return  await order.save();
    }catch(error){
 throw new Error(error.message);
    }
}

const orderShipped = async(orderId) =>{
    try{
        const order = await findOrderById(orderId);
        order.paymentStatus = "COMPLETED",
        order.orderStatus = "SHIPPED"
        return  await order.save();
    }catch(error){
 throw new Error(error.message);
    }
}

const orderDelieverd = async(orderId) =>{
    try{
        const order = await findOrderById(orderId);
        order.paymentStatus = "COMPLETED",
        order.orderStatus = "DELIVERED"
        return  await order.save();
    }catch(error){
 throw new Error(error.message);
    }
}

const orderCancelled = async(orderId) =>{
    try{
        const order = await findOrderById(orderId);
        order.orderStatus = "CANCELLED"
        return  await order.save();
    }catch(error){
 throw new Error(error.message);
    }
}

const userOrderHistory = async(userId) =>{
    try{
        const historyOrders = await Order.find({user:userId,orderStatus:"PLACED"}).populate({path:"orderItems",populate:{path:"product"}}).lean();
        return historyOrders;
            }catch(error){
         throw new Error(error.message);
            }
}

const getAllOrders = () =>{
    try{
        const allOrders = Order.find().populate({path:"orderItems",populate:{path:"product"}}).lean();
        return allOrders;
            }catch(error){
         throw new Error(error.message);
            }
}

const deletOrder = async (orderId) =>{
    try{
    const order = await Order.findById(orderId);
    return Order.findByIdAndDelete(order._id);
    }catch(error){
        throw new Error(error.message);
    }
}
module.exports = {createOrder,orderPlaced,orderShipped,orderConfirmed,orderDelieverd,orderCancelled,userOrderHistory,getAllOrders,deletOrder,findOrderById}
const Rating = require("../models/Rating.model.js");
const productService=require("../services/product.service.js");

async function createRating(req, user){
const product = await productService.findProductById(req.productId);
const rating =new Rating({
product: product._id,
user: user._id,
rating: req.rating,
createdAt: new Date()
})
return await rating.save();
}

async function getProductRating(productId) {
return await Rating.find({product:productId});
}

async function getAllRatings(productId){
    const product=await productService.findProductById(reqData.productId);
return await Rating.find({product:productId}).populate("user");
}

module.exports={
createRating,
getProductRating,
getAllRatings
}
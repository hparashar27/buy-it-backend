const Review = require("../models/Review.model.js");
const productService = require("../services/product.service.js");

async function createReview(reqData, user) {
const product = await productService.findProductById(reqData.productId);
const review= new Review({
user: user._id,
product: product._id,
review: reqData.review,
createdAt: new Date()
})
return await review.save();
}

async function getProductReview(productId) {
    return await Review.find({product:productId});
}

async function getAllReivew(productId) {
    console.log(reqData);
const product=await productService.findProductById(reqData.productId);
return await Review.find({product:productId}).populate("user");
}

module.exports = {createReview,getAllReivew,getProductReview}

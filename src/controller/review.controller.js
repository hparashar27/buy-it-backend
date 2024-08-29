const reviewService  = require("../services/review.service");

const createReview = async(req,res) =>{
    const user = req.user;
    try{
const review = await reviewService.createReview(req.body,user);
return res.status(200).send(review);
    }catch(error){
return res.status(500).send({error:error.message});
    }
}

const getAllReivew = async(req,res) =>{
    const productId = req.params.productId;
    try{
const reviews = await reviewService.getProductReview(productId);
return res.status(200).send(reviews);
    }catch(error){
return res.status(500).send({error:error.message});
    }
}

module.exports = {createReview,getAllReivew};
const Category = require("../models/Category.model");
const Product = require("../models/Product.model");

const createProduct = async(reqData) =>{
    try{
        let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
        if (!topLevel) {
            topLevel = new Category({
                name: reqData.topLevelCategory,
                level: 1,
            });
            await topLevel.save();
        }

        let secondLevel = await Category.findOne({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
        });
        if (!secondLevel) {
            secondLevel = new Category({
                name: reqData.secondLevelCategory,
                parentCategory: topLevel._id,
                level: 2,
            });
            await secondLevel.save();
        }

        let thirdLevel = await Category.findOne({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id, // Corrected parent category reference
        });
        if (!thirdLevel) {
            thirdLevel = new Category({
                name: reqData.thirdLevelCategory,
                parentCategory: secondLevel._id,
                level: 3,
            });
            await thirdLevel.save();
        }

const product = new Product({
title:reqData.title,
description:reqData.description,
color:reqData.color,
discountedPercent:reqData.discountedPercent,
discountedPrice:reqData.discountedPrice,
imageUrl:reqData.imageUrl,
brand:reqData.brand,
price:reqData.price,
sizes:reqData.sizes,
quantity:reqData.quantity,
category:thirdLevel._id,
})

const createdProduct = await product.save();
return createdProduct;
    }catch(error){
throw new Error(error.message);
    }
}

const deleteProduct = async(productId) =>{
try{
const product = await findProductById(productId);
await Product.findByIdAndDelete(productId);
return "Product deleted successfully"
}catch(error){
throw new Error(error.message);
}
}

const updateProduct = async (productId, reqData) => {
    try {
        console.log("Update data:", reqData);

        // Find the product and update it
        const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });

        if (!updatedProduct) {
            throw new Error("Product not found or update failed");
        }

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error.message);
        throw new Error(error.message);
    }
};


const findProductById = async(id) =>{
    try{
        const product = await Product.findById(id)
        .populate({
            path: 'category',
            populate: {
                path: 'parentCategory',
                populate: {
                    path: 'parentCategory',
                }
            }
        })
        .exec();
console.log(product)
if(!product){
    throw new Error("Cannot able to find the product id !",+id);
}
return product;
    }catch(error){
        throw new Error(error.message);        
    }
}

const getAllProducts = async(reqQuery) =>{
    let {title,description,category,color,sizes,minPrice,maxPrice,discountedPercent,sort,stock,pageNumber,pageSize} = reqQuery;

    pageSize = pageSize || 10;

    let query = Product.find().populate({
        path: 'category',
        populate: {
            path: 'parentCategory',
            populate: {
                path: 'parentCategory',
            }
        }
    })

    if(category){
        const existCategory = await Category.findOne({name:category});
        if(existCategory){
            query = query.where("category").equals(existCategory._id);
        }else{
return {content:[],totalPages:0,currentPage:1}
        }
    }

    if(color) {
        const colorSet = new Set(color.split(",").map(color=> color.trim().toLowerCase()));
    const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"): null;
    query=query.where("color").regex (colorRegex);
    }
    
    if(sizes) {
        const sizesSet=new Set (sizes);
        query = query.where("sizes.name").in([...sizesSet]);
    }

    if(minPrice && maxPrice) {
        query= query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }
   
    if(discountedPercent) {
        query=  query.where("discountedPercent").gt(discountedPercent)
    }
    
    if(stock) {
        if(stock==" in_stock") {
            query=query.where("quantity").gt(0)
        }
        else if(stock=="out_of_stock"){
        query=query.where("quantity").gt(1);
        }
        }

    if(sort){
            const sortDirection=sort==="price_hight"?-1:1;
            query=query.sort({discountedPrice:sortDirection})
        }
        const totalProducts=await Product.countDocuments(query);
        // const skip=(pageNumber-1)*pageSize;
        // query=query.skip (skip).limit(pageSize);
        const products= await query.exec();

        const totalPages=Math.ceil(totalProducts/pageSize);
return {content:products, curentPage: pageNumber, totalPages}
    }


const createMultipleProducts = async (products) => {
    if (!Array.isArray(products)) {
        throw new Error("products is not an array or iterable");
    }

    for (let product of products) {
        await createProduct(product);
    }
};

const getProducts = async()=>{
    try{
        let query = Product.find().populate({
            path: 'category',
            populate: {
                path: 'parentCategory',
                populate: {
                    path: 'parentCategory',
                }
            }
        });
    
    
    const products = await query.exec();
    return products;
    }catch(error){
throw new Error(error.message);
    }
}

module.exports = {createProduct,updateProduct,deleteProduct,getAllProducts,createMultipleProducts,findProductById,getProducts}
const productService = require("../services/product.service");

const createProduct = async(req,res) =>{
    try{
const product = await productService.createProduct(req.body);
return res.status(200).send(product);
    }catch(error){
return res.status(500).send({error:error.message})
    }
}

const deleteProduct = async(req,res) =>{
    const productId = req.params.id;
    try{
        const product = await productService.deleteProduct(productId);
return res.status(200).send({message:"product is deleted !"});
    }catch(error){
return res.status(500).send({error:error.message});
}
}

const updateProduct = async(req,res) =>{
    const productId = req.params.id;
    try{
const product = await productService.updateProduct(productId,req.body);
return res.status(200).send(product);
    }catch(error){
return res.status(500).send({error:error.message})
    }
}

const findProductById = async(req,res) =>{
    const productId = req.params.id;
    try{
const product = await productService.findProductById(productId);
return res.status(200).send(product);
    }catch(error){
return res.status(500).send({error:error.message})
    }
}

const getAllProducts = async(req,res) =>{
    const query = req.query
    try{
const products = await productService.getAllProducts(query);
return res.status(200).send(products);
    }catch(error){
return res.status(500).send({error:error.message})
    }
}

const createMultipleProducts = async(req,res) =>{
    try{
const product = await productService.createMultipleProducts(req.body);
return res.status(200).send(product);
    }catch(error){
return res.status(500).send({error:error.message})
    }
}

const getProducts = async(req,res) =>{
    try{
const allproducts = await productService.getProducts();
return res.status(200).send(allproducts);
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}

module.exports = {createProduct,deleteProduct,updateProduct,findProductById,getAllProducts,createMultipleProducts,getProducts}
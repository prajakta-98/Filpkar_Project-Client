//import {request,response } from "express";
import express, { request, response } from "express";
import Product from "../module/productschema.js";

export const getProducts = async (request,response) => {
  try {
   const  products = await Product.find({});
   response.status(200).json(products);
  } catch (error) {
    console.log('jsxhaushdk',error);
    response.status(500).json({message:error.message});
  }
}

// Fetch all products
export const getProductsDetails = async (request, response) => {
  try {
    const products = await Product.find({});
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Fetch product by ID
export const getDetails = async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({ message: 'Product not found' });
    }
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Update product by ID
const router = express.Router();
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

let cart =[];

// Add item to cart
export const addToCart  = (request, response) => {
  const {productID,quantity} = request.body;
  const existingproduct =cart.find(item => item.productID ===productID);

  if(existingproduct){
    existingproduct.quantity += quantity;
  }else{
    cart.push({productID,quantity});
  }
  response.status(200).json({message:"product added to cart"});
};

// Remove item from cart
export const removeFromCart  =(request,response) =>{

  const{productID} = request.params;
  cart = cart.filter(item =>item.productID !== productID);

  response.status(200).json({message:"product removed from cart"});
};

// Get cart items
export const getCart  = (request, response) => {
  response.status(200).json(cart);
};

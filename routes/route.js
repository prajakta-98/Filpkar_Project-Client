import express from "express";
import {usersignup,userLogin} from "../controller/userController.js";
import{getDetails, getProducts} from '../controller/productControler.js';
import { addToCart,removeFromCart,getCart } from "../controller/productControler.js";

const router= express.Router();

router.post('/signup',usersignup);

router.post('/login',userLogin);

router.get('/products',getProducts);

router.get('/products/:id', getDetails); // Dynamic Route for product details

// Add item to cart
router.post('/cart', addToCart);

// Remove item from cart
router.delete('/cart/:productId', removeFromCart);

// Get cart items
router.get('/cart', getCart);
export default router;
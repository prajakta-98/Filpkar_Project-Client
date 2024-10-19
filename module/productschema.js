import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
//validating through ID
   id:{                                          
   type:String,
   required: true,
   unique:true
},
url:String,
detailedUrl:String,
title:Object,
price:Object,
quantity:Number,
describtion:String,
discount:String,
tagline:String,
});

const Product = mongoose.model('Product', productSchema);
export default Product;

import axios from "axios";
const URL = "http://localhost:8000";

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${URL}/login`, user);
  } catch (error) {
    console.log("Error while calling login API: ", error);
    return error.response || { status: 500 }; 
  }
};
// Return a default error response

export const authenticateSignup = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("Error while calling signup API", error);
  }
};

export const productListing = async(data) =>{
  try {
    return await axios.post('/products',data)
  } catch (error) {
    console.log("Error while calling product API",error)
  }
};

export const getProductdetails =async(id) =>{
  try {
    const {data} =await axios.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.log('Error fetching product details',error);
    throw error;
    
  }
};

import { products } from "../constants/data.js"
import Product from "../module/productschema.js";

const DefaultData=async()=>{
try {   
    //Inserting the objects in monogoDB
   //await Product.deleteMany({}) ;
   await Product.insertMany(products) ;           
    console.log('Data imported successfully');
    
} catch (error) {
    console.log('Error while inserting default data',error.message);
    
}
}
export default DefaultData;
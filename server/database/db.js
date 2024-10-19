import mongoose from "mongoose";


export const Connection=async(username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@e-commerce.gu5dg.mongodb.net/?retryWrites=true&w=majority&appName=E-commerce`;
    try {
       await mongoose.connect(URL,{useunifiedTopology:true, useNewUrlParser:true});
       console.log('Database connected succesfully');
       
    } catch (error) {
        console.log('Error while connecting with the database',error.message);
        
    }
}
export default Connection
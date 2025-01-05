// Login And Signup APIs are here.
import User from '../module/userSchema.js'
// signup API:
export const usersignup= async(request,response)=>{
    try {
      //console.log(request.body)
const exist= await User.findOne({username: request.body.username}); 
if(exist){  
                                                                      // checking if username exsits 
    return response.status(401).json({message:'User name already exist'}); 
}
     const user= request.body
     const newUser= User(user)
     await  newUser.save();

     response.status(200).json({message:user});
    } catch (error) {
       response.status(500).json({message: error.message});//internal servaer error
        
    }

}

// Login API
export const userLogin= async (request,response)=> {
    try {
        let user = await User.findOne({ username: request.body.username, password: request.body.password });// if username=username and password=password
        if(user) {
            //return response.status(200).json(`${request.body.username} login successfull`);
            return response.status(200).json({data:user});
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}

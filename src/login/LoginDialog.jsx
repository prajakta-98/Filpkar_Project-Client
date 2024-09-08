import { Box, Button, Dialog, TextField, Typography,styled } from '@mui/material'
import { useState,useContext} from 'react';
import {authenticateSignup,authenticateLogin} from '../service/Api.js'
import { DataContext } from '../context/dataProvider.jsx';


const Component = styled(Box)`
  height: 90vh;
  width: 100vh;`

  const Image = styled(Box)`
  background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png ) center 85% no-repeat;
  height: 89%;
  width:28%;
  padding:40px 30px;
  & > p, & > h5{
  color:#fff;
  font-weight: 600
  }
  `;
const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex: 1;
overflow:hidden;
flex-direction: column;
& > div, & > button, & > p {
    margin-top: 20px;
}
`;

const LoginButton = styled(Button)`
text-transform: none;
background: #fb641b;
color:#fff;
height: 48px;
border-radius: 2px;
`;

const RequstOTP = styled(Button)`
text-transform: none;
background: #fff;
color:#2874f0;
height: 48px;
border-radius: 2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
font-size: 12px;
color: #8787;
`;

const CreateAccount = styled(Typography)`
font-size: 14px;
text-align:center;
color: #2874f0;
font-weight: 600;
cursor:pointer
`
const Error= styled(Typography)`
font-size: 10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600
`
const accountInitialValues = {
  login: {
      view: 'login',
      heading: 'Login',
      subHeading: 'Get access to your Orders, Wishlist and Recommendations'
  },
  signup: {
      view: 'signup',
      heading: "Looks like you're new here!",
      subHeading: 'Sign up with your mobile number to get started'
  }
}

const signupInitials ={
  firstname:'',
  lastname:'',
  username:'',
  email:'',
  password:'',
  phone:''
}
const loginInitaialValues={
  username:'',
  password:''
}
const LoginDailog = ({open,setopen}) => { 
  const [account, toggleAccount] = useState(accountInitialValues.login)//obejct destructuring
  const [signup, setSignup] = useState(signupInitials)
 const[login,setLogin] = useState(loginInitaialValues)
 const[error,setError] = useState(false)    
  const{setAccount }= useContext(DataContext)

  const handleClose = () => {
    setopen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
}

const toggleSignup=()=>{
  toggleAccount(accountInitialValues.signup);
}

const onInputChange=(e)=>{
setSignup({...signup,[e.target.name]: e.target.value})
}

const signupUser= async ()=>{
let response= await authenticateSignup(signup);
if(!response)return;
handleClose();
setAccount(signup.firstname);
}
const onValueChange = (e) => {
  setLogin({ ...login, [e.target.name]: e.target.value });
}

const loginUser = async () => {
  try {
    let response = await authenticateLogin(login);
    console.log(response);

    if (response.status === 200) {
      handleClose();
      setAccount(login.username);
    } else if (response.status === 401) {
      setError(true);  // Show an error message if login fails
    } else {
      console.log('Login failed. Please check your credentials or try again later.');
    }
  } catch (error) {
    console.log('Error during login', error);
  }
};

  return (
    // MUI sets maximum width by default
    <Dialog open= {open} onClose={handleClose} PaperProps={{sx:{maxWidth:'unset'}}}> 
      <Component>
        <Box style={{display:'flex',height:'100%'}}>
       <Image>
        <Typography variant='h5'>Login</Typography>
        <Typography style={{marginTop: 20}}>Get access to your Orders, Wishlist and Recommendations</Typography>
       </Image>
       {
        account.view === 'login'?
       <Wrapper>
{/* gives error i username or pass is wrong */}
        <TextField variant="standard" onChange={(e) =>onValueChange(e)} name='username' label='Enter username' />
        { error && <Error>Please enter valid Email ID/Mobile number</Error> }  
        
        <TextField variant="standard" onChange={(e) =>onValueChange(e)} name='password' label='Enter Password' />
       <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
       <LoginButton onClick={() => loginUser()} >Login</LoginButton>
       <Typography style={{textAlign: 'center'}}>OR</Typography>
       <RequstOTP>Request OTP</RequstOTP>
       <CreateAccount onClick={()=>toggleSignup()}>New to Flipkart? Create Account</CreateAccount>
      
       </Wrapper>:

<Wrapper>
<TextField variant="standard" name='firstname' label='Enter Firstname' onChange={(e) => onInputChange(e)} />
<TextField variant="standard" name='lastname' label='Enter Lastname'  onChange={(e) => onInputChange(e)}/>
<TextField variant="standard" name='username' label='Enter Username' onChange={(e) => onInputChange(e)} />
<TextField variant="standard" name='email' label='Enter Email' onChange={(e) => onInputChange(e)} />
<TextField variant="standard" name='password' label='Enter Password'  onChange={(e) => onInputChange(e)}/>
<TextField variant="standard" name='phone' label='Enter Phone' onChange={(e) => onInputChange(e)} />
<LoginButton onClick={()=> signupUser()}>Continue</LoginButton>
</Wrapper>
}
       </Box>
      </Component>    
      </Dialog>
  )
}

export default LoginDailog
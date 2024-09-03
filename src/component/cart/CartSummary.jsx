import React, { useEffect, useState } from 'react';
import { Box, Typography, styled} from '@mui/material';

const Header = styled(Box)`
    color: #878787;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;
const Heading = styled(Typography)`
    color: #878787;
`;
const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    margin-top:54px;
    & > p{
        margin-bottom: 20px;
        font-size: 14px;
    }
`;
const Price = styled(Typography)`
    float: right;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`
const CartSummary = ({ cartItems }) => {
const [price,setPrice] = useState(0);
const [discount,setDiscount] = useState(0);
const [quantity,setQuantity] = useState(1);
useEffect(()=>{
  totalAmount();

},[cartItems]);
const totalAmount =()=>{
 let price =0, discount =0;

 cartItems.map((item)=>{
   price += item.price.mrp * item.quantity;
   discount +=(item.price.mrp - item.price.cost * item.quantity);
 });

 setPrice(price);
 setDiscount(discount);
 setQuantity(quantity);
}
  return (
    <Box>
      <Header>
        <Heading variant="h6">PRICE DETAILS</Heading>
      </Header>
      
      <Container>
        <Typography>Price ({cartItems ?.length} items)
      <Price component='span'>₹{price} </Price>
        </Typography>
        
        {/* <Typography>Price ({cartItems ?.length} items)
      <Price component='span'>₹{quantity} </Price>
        </Typography> */}

        <Typography>Discount   
      <Price component='span'>-₹ {discount}</Price>
        </Typography>
       
        <Typography>Delivery Charges     
      <Price component='span'>₹40</Price>
        </Typography>
        
        <Typography variant='h6'>Total Amount   
      <Price component='span'>₹{price-discount+40}</Price>
        </Typography>
        <Discount>You will save ₹{discount - 40} on this order</Discount>
       
      </Container>
  
    </Box>
  );
};

export default CartSummary;

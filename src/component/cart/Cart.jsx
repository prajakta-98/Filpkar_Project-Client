import React from 'react';
import { Box, Typography, Button, styled, Grid } from '@mui/material';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useCart } from '../../context/CartContext';


const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Cart = () => {
  
  const { cartItems } = useCart();

  console.log("cart.........",CartItem);
  return (

    <Container container >
      <Grid item lg={9} md={9} sm={12} xs={12}>
       

        {cartItems?.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </Grid>
      <Box>
        <CartSummary cartItems={cartItems} />
      </Box> 
      
    </Container>

  );
};

export default Cart;

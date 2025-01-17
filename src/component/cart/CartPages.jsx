import React from 'react';
import { Box, Typography, styled, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
const Component = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',
  display: 'flex',
  background: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: '15px 0',
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  background: #fff;
  padding: 15px 20px;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background-color: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
  &:hover {
    background-color: #fb641b;
  }
`;

const CartPages = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };
  
  // Redirect to empty cart page if cart is empty
  if (cartItems.length === 0) {
    navigate('/empty-cart');
    return null; // Return null to avoid rendering the rest of the component
  }
  return (
  
    <Component container>
      <LeftComponent item lg={9} md={9} sm={12} xs={12}>
        <Header>
          <Typography variant="h5">
            My Cart {cartItems.length > 0 ? `(${cartItems.length})` : ''}
          </Typography>
        </Header>

        {cartItems.map((value) => (
          <CartItem key={value.id} value={value} />
        ))}

        <BottomWrapper>
        <StyledButton variant="contained" onClick={handlePlaceOrder}>PLACE ORDER</StyledButton>
        </BottomWrapper>
      </LeftComponent>

      <Grid item lg={3} md={3} sm={12} xs={12}>
        <CartSummary cartItems={cartItems} />
      </Grid>
    </Component>

  );
};

export default CartPages;

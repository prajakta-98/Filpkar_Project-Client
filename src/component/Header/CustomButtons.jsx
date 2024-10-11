import { Badge, Box, Button, Typography, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// Components
import LoginDailog from "../login/LoginDialog";
import { DataContext } from "../context/dataProvider";
import Profile from "./Profile";
import { useCart } from "../context/CartContext";

const Wrapper = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  '& > *': {
    marginRight: '40px !important',
    textDecoration: 'none',
    color: '#FFFFFF',
    fontSize: 12,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      color: '#2874f0',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: 10,
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const LoginButton = styled(Button)`
`;

const CustomButtons = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const { cartItems = [] } = useCart(); // Default to empty array
  const navigate = useNavigate(); // Initialize navigate

  const openDialog = () => {
    setOpen(true);
  };

  const handleCartClick = () => {
    if (cartItems.length === 0) {
      navigate('/empty-cart'); // Redirect to EmptyCart if the cart is empty
    } else {
      navigate('/cart'); // Redirect to CartPages if the cart has items
    }
  };

  return (
    <Wrapper style={{ alignItems: "center" }}>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton
          variant="contained"
          onClick={openDialog}
          style={{
            color: "#2874f0",
            background: "#FFFFFF",
            textTransform: "none",
            padding: "5px 40px",
            margin:"15px",
            borderRadius: 2,
            fontWeight: "bold",
            fontFamily: "Inter",
            boxShadow: "none",
            height: 32,
          }}
        >
          Login
        </LoginButton>
      )}
      <Typography style={{ marginTop: 3, width: 142 }}>
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: 3 }}> More </Typography>

      {/* Handle the click event on the cart */}
      <Container onClick={handleCartClick}>
        <Badge badgeContent={cartItems.length} color="primary">
        <ShoppingCart />
        </Badge>
        <Typography>
           Cart  
        </Typography>
      </Container>

      <LoginDailog open={open} setopen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;

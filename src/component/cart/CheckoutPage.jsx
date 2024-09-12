import React, { useState } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import SuccessModal from './SuccessModal'; // Import the SuccessModal component
import { useCart } from '../../context/CartContext';
const Container = styled(Box)`
  padding: 20px;
  background: #fff;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled(Box)`
  margin-bottom: 20px;
`;
const CheckOutBtn = styled(Button)`
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 100%;
  &:hover {
    background: #fb641b; 
  }
`;
const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [upi, setUpi] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false); // State to control the modal
  const { clearCart } = useCart(); // Destructure the clearCart function
  const validateAddress = () => {
    return address.length > 10;
  };

  const validatePincode = () => {
    return /^[1-9][0-9]{5}$/.test(pincode);
  };

  const validateMobile = () => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validateUpi = () => {
    return /^[a-zA-Z0-9.\-]{2,256}@[a-zA-Z]{2,64}$/.test(upi);
  };

  const validateCard = () => {
    const cardNumberValid = /^\d{16}$/.test(cardNumber);
    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry);
    const cvvValid = /^\d{3,4}$/.test(cardCvv);
    return cardNumberValid && expiryValid && cvvValid;
  };

  const handlePlaceOrder = () => {
    if (!validateAddress()) {
      alert('Invalid address');
      return;
    }
    if (!validatePincode()) {
      alert('Invalid pincode');
      return;
    }
    if (!validateMobile()) {
      alert('Invalid mobile number');
      return;
    }
    if (upi && !validateUpi()) {
      alert('Invalid UPI ID');
      return;
    }
    if (cardNumber && !validateCard()) {
      alert('Invalid card details');
      return;
    }
    setOrderPlaced(true); // Show the success modal
    clearCart();
  };

  return (
    <Container>
      <Typography variant="h5">Checkout</Typography>

      <FormSection>
        <Typography variant="h6">Shipping Address</Typography>
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </FormSection>

      <FormSection>
        <TextField
          fullWidth
          label="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
      </FormSection>

      <FormSection>
        <TextField
          fullWidth
          label="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </FormSection>

      <FormSection>
        <Typography variant="h6">UPI Payment</Typography>
        <TextField
          fullWidth
          label="UPI ID"
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
        />
      </FormSection>

      <FormSection>
        <Typography variant="h6">Card Payment</Typography>
        <TextField
          fullWidth
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <TextField
            label="Expiry Date (MM/YY)"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
          />
          <TextField
            label="CVV"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
          />
        </Box>
      </FormSection>

    <CheckOutBtn variant="contained" onClick={handlePlaceOrder}>
       Continue
      </CheckOutBtn>

      <SuccessModal open={orderPlaced} handleClose={() => setOrderPlaced(false)} />
    </Container>
  );
};

export default CheckoutPage;

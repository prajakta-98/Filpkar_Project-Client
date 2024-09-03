import { Card,Box, Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { addEllipsis } from "../../utils/commonutils";
import { useState } from "react";


const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const QuantityButton = styled(Button)`
  border: 1px solid #ccc;
  padding: 5px;
  min-width: 30px;
  min-height: 10px;
  font-size: 16px;
  border-radius: 80%;
  color: #000;
`;

const RemoveButton = styled(Button)`
  color: #000;
  font-weight: 600;
  margin-top: 10px;
 min-width: 20%;
`;
 const Smalltext = styled(Typography)`
 color: #878787;   
 font-size: 14px;
 margin-top: 10px;
 `

 const Cost = styled(Typography)`
 font-size: 18px;
 font-weight: 600;
`;
const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const CartItem = ({ value }) => {
  const { increaseQuantity, decreaseQuantity,removeFromCart } = useCart();
  const [open,setOpen]= useState(false); //state to control modal
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
  
  const handleClickOpen =()=>{
    setOpen(true);
  }
  const  handleClose =()=>{
    setOpen(false)
  };
  const handleRemove = () => {
    removeFromCart(value.id); // Call remove function
    setOpen(false); // Close the modal
  };
  return (

     <Component container>
       <LeftComponent >
      <img src={value.url} alt={value.name} width="100px" height="100px"/>
      </LeftComponent>

       <Box style={{ margin: 20 }}>
        <Typography variant="h6">{addEllipsis(value.title.longTitle)}</Typography>
        
        <Smalltext> Seller: RetailNet
            <Box component="span"><img src={fassured} alt="Fassured" style={{ width: 77, marginLeft: 10 }} /></Box>
        </Smalltext>

        <Typography style={{marginTop: '20px,0'}}>
            <Cost component="span" style={{  fontWeight: 600,fontSize: 18 }}>₹{value.price.cost}</Cost> &nbsp;
            <MRP component="span" style={{ color: '#878787' }}><strike>₹{value.price.mrp}</strike></MRP>  &nbsp; 
            <Discount component='span'style={{ color: '#388E3C' }}>{value.price.discount}</Discount>
         </Typography>

         <RemoveButton item lg={2} sm={2} xs={1} onClick={handleClickOpen}>REMOVE</RemoveButton>
        
        <Box display="flex" alignItems="center">
          <QuantityButton onClick={() => decreaseQuantity(value.id)}>-</QuantityButton>
          <Typography style={{ margin: '0 10px' }}>{value.quantity}</Typography>
          <QuantityButton onClick={() => increaseQuantity(value.id)}>+</QuantityButton>
        </Box>
      </Box>

      {/* Modal for Remove Confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleRemove} color="primary" autoFocus>Remove</Button>
        </DialogActions>
      </Dialog>
    </Component>
  );
};
    // </Component>
    
  // )
  
// }

export default CartItem;

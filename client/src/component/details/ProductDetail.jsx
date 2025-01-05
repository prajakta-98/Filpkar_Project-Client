import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, Typography, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import DetailView from './DetailView';
import { useCart } from '../../context/CartContext';

function ProductDetail() {
  const { id } = useParams(); // Get the id from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // State to store any error
  const { addToCart } = useCart();
  
  const Component = styled(Box)`
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    padding: 20px;
  `;
  
  const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    width: '90%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      margin: 0
    }
  }));
  
  const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '30%',
    padding: '40px 0 0 40px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
      marginBottom: '20px'  // To add some space between the containers on smaller screens
    }
  }));
  
  const RightContainer = styled(Grid)(({ theme }) => ({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      padding: '10px'
    }
  }));

  const Image = styled('img')({
    padding: '15px',
    marginTop: 55,
    width: '300px'
  });

  const StyleButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: '50px',
    borderRadius: '2px',
    [theme.breakpoints.down('sm')]: {
      width: '46%'
    }
  }));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        //console.log('Fetched Product Data:', response.data);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product details. Please try again later.');
      }
    };
    fetchProduct();
  }, [id]); // Run the effect only when the id changes

  const handleAddTocart = () => {
    if (product) {
      addToCart(product, 1); // Add one item to the cart
    }
  };

  return (
    <Component>
      {product && Object.keys(product).length > 0 ? (
        <Container container>
          {/* Left container for product image */}
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <LeftContainer>
              <Box style={{ padding: '10px 20px', border: '1px solid #f0f0f0', width: '90%' }}>
                <Image src={product.url} alt={product.title.longTitle} />
              </Box>
              <StyleButton
                variant="contained"
                onClick={handleAddTocart}
                style={{ marginRight: 10, marginTop: 16, background: '#ff9f00' }}
              >
                <Cart /> Add to Cart
              </StyleButton>
              <StyleButton
                variant="contained"
                style={{ background: '#fb641b', marginTop: 16 }}
              >
                <Flash /> Buy Now
              </StyleButton>
            </LeftContainer>
          </Grid>

          {/* Right container for product details */}
          <Grid item lg={8} md={8} sm={8} xs={12}>
            <RightContainer>
              <DetailView product={product} />
            </RightContainer>
          </Grid>
        </Container>
      ) : (
        <Typography variant="h6">Loading product details...</Typography>
      )}
      {error && <Typography variant="h6" color="error">{error}</Typography>}
    </Component>
  );
}

export default ProductDetail;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import { Card, CardMedia, CardContent, Typography, styled, Box, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function Product() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setList(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  const Container = styled(Box)`
    margin-top: 18px;
    background: #fff;
  `;

  const ViewAllButton = styled(Button)`
    top:-44px;
    margin-inline:8px;
    float: right;
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 600;
  `;

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Deals of the Day
      </Typography>
      <ViewAllButton variant="contained">View All</ViewAllButton>
      <Divider />
      <Carousel
        responsive={responsive}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        swipeable={false}
        draggable={false}
        showDots={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        slidesToSlide={1}
      >
        {list.map((product) => (
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
            key={product.id}
          >
            <Card
              sx={{
                maxWidth: 200,
                textAlign: 'center',
                margin: '0 10px',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product?.url || '/placeholder-image-url.png'} // Use a placeholder if the image URL is missing
                alt={product?.title?.shortTitle || 'Product Image'}
                sx={{ objectFit: 'contain', paddingTop: '32px', border: '#e0e0e0' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {product.title?.shortTitle || product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                  {product.price?.cost ? `From ₹${product.price.cost}` : 'Shop Now!'}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
    </Container>
  );
}

export default Product;

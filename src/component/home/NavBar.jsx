import React from 'react'
import { Box, Typography } from '@mui/material';
import { navData } from '../../constants/data';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const Component = styled(Box)(({ theme }) => {
  const muiTheme = useTheme(); // Use the MUI theme
  return {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '55px 130px 0 130px !important',
    overflowX: 'hidden',
  
    [muiTheme.breakpoints.down('lg')]: {
      objectFit: 'cover',
      height: 180,
    },
  };
});

const Container = styled(Box)`
padding: 12px 8px;
text-align:center;
`
const Text = styled(Typography)`
font-size:14px;
font-weight:600;
color:#333;
`
const NavBar = () => {
  return (
  <Box style={{backgroundColor:'#fff'}}> 
 <Component>
{
  // geting data from navData
navData.map((data)=>(
    <Container>
    <img src={data.url} alt='nav' style={{ width: 64 }}></img>
    <Text style={{fontFamily:'Inter' }}>{data.text}</Text> 
 </Container>
  ))
}
</Component>
</Box> 
  )
}
export default NavBar
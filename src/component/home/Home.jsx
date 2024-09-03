import React from 'react'
import NavBar from './NavBar'
import Banner from './Banner'
import Product from './Product';
import MidSection from './Midsection';
import { styled, Box } from '@mui/system';

const Component = styled(Box)`
padding: 10px 10px;
background: #f2f2f2;
`

const Home = () => {
  return (
    <>
    <NavBar/>
    <Component>
    <Banner/>
    </Component>
    <Product/>
    <MidSection/>
    <Product/>
    </>
    
  )
}

export default Home
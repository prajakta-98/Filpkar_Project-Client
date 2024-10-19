import { useState } from 'react';
import { AppBar, Toolbar, Box, Typography,IconButton, Drawer, List,ListItem } from "@mui/material";
import { styled } from "@mui/system";
import Search from "./Search";
import CustomButtons from "./CustomButtons";
// import { useCart } from '../../context/CartContext';

import { Menu } from '@mui/icons-material';
import { Link } from "react-router-dom";

const StyleHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;

const Component = styled(Link)`
  margin-left: 12%;
  text-decoration:none;
  color:inherit;
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
  font-family:Inter;
`;

const PlusLogo = styled('img')({
  width: 10,
  marginLeft: 4,
  height: 10
});
const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
      display: 'block'
  }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
  margin: '0 5% 0 auto', 
  [theme.breakpoints.down('md')]: {
      display: 'none'
  }
}));
const Header = () => {
  const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
  const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
  const [open, setOpen] = useState(false);
  // const {cartItems} = useCart();

  const handleClose = () => {
      setOpen(false);
  }

  const handleOpen = () => {
      setOpen(true);
  }

  const list = () => (
    <Box style={{ width: 250 }} onClick={handleClose}>
        <List>
            <ListItem >
                <CustomButtons />
            </ListItem>
        </List>
    </Box>
);
  return (
    <>
      <StyleHeader>
        <Toolbar style={{ minHeight: 54 }}>
        <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>

          <Component to={'/'}>
            <img src={logoURL} alt="FlipkartLogo" style={{ width: 75 }} />
            <Box style={{ display: 'flex' }}>
              <SubHeading>Explore
                <Box component={'span'} style={{ color: '#FFE500' }}>Plus</Box>
              </SubHeading>
              <PlusLogo src={subURL} alt="PlusLogo" style={{ width: 10 }} />
            </Box>
          </Component>
          <Search />
          <CustomButtonWrapper>
            <CustomButtons/>
          </CustomButtonWrapper>
        </Toolbar>
      </StyleHeader>
    </>
  );
};

export default Header;

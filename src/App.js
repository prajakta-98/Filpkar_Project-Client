import Header from "./component/Header/Header.jsx";
import Home from "./component/home/Home.jsx";
import { Box } from "@mui/material";
import DataProvider from "./context/dataProvider.jsx";
import ProductDetail from "./component/details/ProductDetail.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import CartPages from "./component/cart/CartPages.jsx";
 import EmtptyCart from "./component/cart/EmptyCart.jsx";
 import CheckoutPage from "./component/cart/CheckoutPage.jsx";
function App() {
  return (
    <>
  <BrowserRouter>
        <DataProvider>
          <CartProvider>
         <Header/>
            <Box style={{ marginTop: 54 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />  
                <Route path="/cart" element={<CartPages />} /> 
                <Route path="/empty-cart" element={<EmtptyCart />} /> 
                 <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </Box>
          </CartProvider>
        </DataProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

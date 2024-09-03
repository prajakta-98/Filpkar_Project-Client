import Header from "./Header/Header";
import Home from "./component/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/dataProvider";
import ProductDetail from "./component/details/ProductDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CartPages from "./component/cart/CartPages";
 import EmtptyCart from "./component/cart/EmptyCart";
 import CheckoutPage from "./component/cart/CheckoutPage";
function App() {
  return (
    <>
  <BrowserRouter>
        <DataProvider>
          <CartProvider>
            <Header />
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

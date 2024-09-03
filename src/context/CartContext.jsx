// /context/CartContext.js
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CartContext = createContext();

export const useCart = () => useContext(CartContext); // Ensure this is named useCart

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existItem = prevItems.find(product => product.id === item.id);
            if (existItem) {
                return prevItems.map(x => x.id === existItem.id ? item : x);
            } else {
                return [...prevItems, item];
            }
        });
    };
    const increaseQuantity = (id) => {
        setCartItems((prevItems) => {
          return prevItems.map(item => 
            item.id === id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        });
      };
      const decreaseQuantity = (id) => {
        setCartItems((prevItems) => {
          return prevItems.map(item => 
            item.id === id && item.quantity > 1 
              ? { ...item, quantity: item.quantity - 1 } 
              : item
          );
        });
      };
      const removeFromCart = (id) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.filter((product) => product.id !== id);
            if (updatedCart.length === 0) {
                navigate('/empty-cart'); // Redirect to EmptyCart if cart is empty
            }
            return updatedCart;
        });
    };
 
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,increaseQuantity,decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    );
};


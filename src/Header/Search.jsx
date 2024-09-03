import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
  margin-left: 40px;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color:  #2874f0;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []); // Fetch products once on component mount

    const handleInputChange = (e) => {
        setText(e.target.value);
        setOpen(false);
    };

    const handleSearchCompletion = () => {
        setText(""); // Clear the search field
        setOpen(true); // Close the dropdown
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInputChange}  
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {
                text && 
                <ListWrapper hidden={open}>
                    {
                        products.filter(product => 
                            product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                        ).map(product => (
                            <ListItem key={product._id}>
                                <Link 
                                    to={`/product/${product._id}`} 
                                    style={{ textDecoration:'none', color:'inherit' }}
                                    onClick={handleSearchCompletion} // Clear search field on click
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
    );
}

export default Search;

import {  Grid, styled } from '@mui/material';
import { imageURL } from '../../constants/data';


const Wrapper = styled(Grid)`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`;
//theme - for breakpoint media query
const Image = styled('img')(({ theme }) => ({ 
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    //if its goin down from medium screen
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 120
    }
}));

const MidSection = () => {
    const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    return (
        <>
            <Wrapper container>
                {
                    imageURL.map((image,index) => (
                        <Grid item lg={4} md={4} sm={12} xs={12} key={index}> 
                            <img src={image} style={{ width: '100%' }} alt={`Banner ${index}`}  />
                        </Grid> 
    
                    ))
                }
            </Wrapper>
            <Image src={url} />
        </>
    )
}

export default MidSection;
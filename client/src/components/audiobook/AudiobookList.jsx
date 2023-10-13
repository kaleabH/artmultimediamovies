import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
// import HeroSlide from '../components/common/HeroSlide';
import { makeStyles } from '@mui/styles';
import AudiobookLogo from "../assets/audiobook2.webp"
const useStyles = makeStyles((theme) => ({
  responsiveImage: {
    maxWidth: '100%', // Ensure the image scales with the container width
    height: 'auto',   // Maintain the image's aspect ratio
    display: 'block', // Prevent unwanted whitespace
    margin: '0 auto', // Center the image horizontally (optional)
  },
  // card: {
  //   maxWidth: 345,
  //   margin: theme.spacing(2),
  //   backgroundImage: `url(https://source.unsplash.com/random/345x200)`, // Random background image
  //   backgroundSize: 'cover',
  //   color: 'white',
  // },
}));
const Audiobook = () => {
  const [cart, setCart] = useState([]);
  const classes = useStyles();
  const audiobooks = [
    { id: 1, title: 'Audiobook 1', price: 10 },
    { id: 2, title: 'Audiobook 2', price: 15 },
    { id: 3, title: 'Audiobook 3', price: 25 },
    { id: 4, title: 'Audiobook 4', price: 15 },
    { id: 5, title: 'Audiobook 5', price: 35 },
    { id: 6, title: 'Audiobook 6', price: 15 },
    { id: 7, title: 'Audiobook 7', price: 20 },
    { id: 8, title: 'Audiobook 8', price: 10 },
    { id: 9, title: 'Audiobook 9', price: "free" },
    { id: 10, title: 'Audiobook 10', price: 10 },
    { id: 11, title: 'Audiobook 11', price: "free" },
    // Add more audiobooks here
  ];

  const addToCart = (audiobook) => {
    setCart([...cart, audiobook]);
  };

  // --------media type added ---------
  
  return (
    <>

    
     <Container>
      <Typography variant="h4">Responsive Image Example</Typography>
      <img
        className={classes.responsiveImage}
        src={AudiobookLogo} // Replace with your image URL
        alt=""
      />
    </Container>

    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Audiobook Store</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Browse Audiobooks
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {audiobooks.map((audiobook) => (
            <Card key={audiobook.id} style={{ margin: '16px', width: '300px' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {audiobook.title}
                </Typography>
                <Typography color="textSecondary">Price: ${audiobook.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => addToCart(audiobook)}
                  color="primary"
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </div>
    </>
  );
};

export default Audiobook;

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
import AudiobookLogo from "../assets/audiobook3.jpg"
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
    backgroundSize: 'cover',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cardImage: {
    height: 200,
  },
  downloadButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
const Audiobook = () => {
  const [cart, setCart] = useState([]);
  const classes = useStyles();
  const audiobooks = [
    { id: 1, title: 'Audiobook 1', price: 10, imageUrl: 'https://example.com/audiobook1.jpg',
    downloadUrl: 'https://example.com/audiobook1.mp3', },
    { id: 2, title: 'Audiobook 2', price: 15, imageUrl: 'https://example.com/audiobook1.jpg',
    downloadUrl: 'https://example.com/audiobook1.mp3', },
    { id: 3, title: 'Audiobook 3', price: 25, imageUrl: 'https://example.com/audiobook2.jpg',
    downloadUrl: 'https://example.com/audiobook2.mp3', },
    { id: 4, title: 'Audiobook 4', price: 15,imageUrl: 'https://example.com/audiobook2.jpg',
    downloadUrl: 'https://example.com/audiobook2.mp3', },
    { id: 5, title: 'Audiobook 5', price: 35 },
    { id: 6, title: 'Audiobook 6', price: 15,imageUrl: 'https://example.com/audiobook2.jpg',
    downloadUrl: 'https://example.com/audiobook2.mp3', },
    { id: 7, title: 'Audiobook 7', price: 20,imageUrl: 'https://example.com/audiobook1.jpg',
    downloadUrl: 'https://example.com/audiobook1.mp3', },
    { id: 8, title: 'Audiobook 8', price: 10,imageUrl: 'https://example.com/audiobook2.jpg',
    downloadUrl: 'https://example.com/audiobook2.mp3', },
    { id: 9, title: 'Audiobook 9', price: "free",imageUrl: 'https://example.com/audiobook1.jpg',
    downloadUrl: 'https://example.com/audiobook1.mp3', },
    { id: 10, title: 'Audiobook 10', price: 10 },
    { id: 11, title: 'Audiobook 11', price: "free",imageUrl: 'https://example.com/audiobook1.jpg',
    downloadUrl: 'https://example.com/audiobook1.mp3', },
    // Add more audiobooks here
  ];

  const addToCart = (audiobook) => {
    setCart([...cart, audiobook]);
  };

  // --------media type added ---------
  
  return (
    <>
   <Container>
   <AppBar position="static"
       style={{
        marginTop:"150px"
       }}
     >
        <Toolbar>
          <Typography variant="h6">Audiobook Store</Typography>
        </Toolbar>
      </AppBar>
   </Container>
    
     <Container
     style={{
      marginTop:"50px",
      backgroundImage: `url(${AudiobookLogo})`, // Set the background image
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      width: '100%', // 
      height: '400px', // 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
     }}
     >
     
      {/* <Typography variant="h4">Responsive Image Example</Typography> */}
     
    </Container>
    
    <div>
      
      <Container>
        {/* <Typography variant="h4" gutterBottom>
          Browse Audiobooks
        </Typography> */}
        <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:"space-around", alignItems:"center"}}>
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
              <CardActions>
                <Button
                  variant="contained"
                  className={classes.downloadButton}
                  onClick={() => window.open(audiobook.downloadUrl)}
                >
                  Download
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

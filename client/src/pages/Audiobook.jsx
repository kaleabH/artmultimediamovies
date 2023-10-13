import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
 
} from '@mui/material';
import HeroSlide from '../components/common/HeroSlide';
import AudiobookLogo from "../assets/audiobook3.jpg"
import AudiobookStore from '../components/audiobook/AudiobookStore';

const Audiobook = () => {
  
  
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
          <AudiobookStore />
      </Container>
    </div>
    </>
  );
};

export default Audiobook;
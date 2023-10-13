// Import necessary libraries
import React from 'react';
import { Grid, Card, CardContent, Typography, Button, makeStyles } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import logo1 from '../../assets/logor1.png'

import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from '@mui/material';

import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import { useState } from 'react';


SwiperCore.use([Navigation]);

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    borderRadius:"20",
    justifyContent: 'space-around',
    transition: 'transform 0.2s', // Add a transition for smoother hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Scale the card on hover
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Add a box shadow on hover
    },
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  categoryTitle: {
    margin: '50px 0px', 
    fontSize: '1.5rem', 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  arrowButton: {
    borderRadius: '20%',
    padding: '5px', // Reduce padding to make the button smaller
    background: '#4c396e',
    cursor: 'pointer',
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));

// Sample audiobooks data
const audiobooks = {
  bestSellers: [
    { id: 2, title: 'Book Title 2', author: 'Author 2',imageUrl:  `url(${logo1})`, },
    { id: 1, title: 'Book Title 1', author: 'Author 1',imageUrl:  `url(${logo1})`, },
    { id: 3, title: 'Book Title 2', author: 'Author 2',imageUrl:  `url(${logo1})`, },
    { id: 4, title: 'Book Title 2', author: 'Author 2',imageUrl:  `url(${logo1})`, },
    { id: 5, title: 'Book Title 2', author: 'Author 2',imageUrl:  `url(${logo1})`, },
    // Add more best seller audiobooks
  ],
  popular: [
    { id: 1, title: 'Book Title 3', author: 'Author 3',imageUrl:  `url(${logo1})`, },
    { id: 2, title: 'Book Title 4', author: 'Author 4',imageUrl:  `url(${logo1})`, },
    { id: 3, title: 'Book Title 4', author: 'Author 4',imageUrl:  `url(${logo1})`, },
    { id: 4, title: 'Book Title 4', author: 'Author 4',imageUrl:  `url(${logo1})`, },
    { id: 5, title: 'Book Title 4', author: 'Author 4',imageUrl:  `url(${logo1})`, },
    { id: 6, title: 'Book Title 4', author: 'Author 4',imageUrl:  `url(${logo1})`, },
    { id: 7, title: 'Book Title 4', author: 'Author 4',imageUrl:  `url(${logo1})`, },
    // Add more popular audiobooks
  ],
  newReleases: [
    { id: 5, title: 'Book Title 5', author: 'Author 5' ,imageUrl:  `url(${logo1})`,},
    { id: 6, title: 'Book Title 6', author: 'Author 6' ,imageUrl:  `url(${logo1})`,},
    { id: 6, title: 'Book Title 6', author: 'Author 6' ,imageUrl:  `url(${logo1})`,},
    { id: 6, title: 'Book Title 6', author: 'Author 6' ,imageUrl:  `url(${logo1})`,},
    { id: 6, title: 'Book Title 6', author: 'Author 6' ,imageUrl:  `url(${logo1})`,},
    { id: 6, title: 'Book Title 6', author: 'Author 6' ,imageUrl:  `url(${logo1})`,},
    { id: 6, title: 'Book Title 6', author: 'Author 6' ,imageUrl:  `url(${logo1})`,},
    // Add more new release audiobooks
  ],
  comingSoon: [
    { id: 7, title: 'Book Title 7', author: 'Author 7' ,imageUrl:  `url(${logo1})`,},
    { id: 8, title: 'Book Title 8', author: 'Author 8' ,imageUrl:  `url(${logo1})`,},
    { id: 8, title: 'Book Title 8', author: 'Author 8' ,imageUrl:  `url(${logo1})`,},
    { id: 8, title: 'Book Title 8', author: 'Author 8' ,imageUrl:  `url(${logo1})`,},
    { id: 8, title: 'Book Title 8', author: 'Author 8' ,imageUrl:  `url(${logo1})`,},
    { id: 8, title: 'Book Title 8', author: 'Author 8' ,imageUrl:  `url(${logo1})`,},
  
  ],
};

function AudiobookCard({ title, author,imageUrl }) {
  const classes = useStyles();
  const cardStyle = {
    backgroundImage: `url(${imageUrl})`, // Set the background image
  };
  return (
    <Card className={classes.card} style={cardStyle}>
    <CardContent className={classes.cardContent}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {author}
      </Typography>
      <Button variant="contained" color="primary">
        Buy Now
        <ArrowForwardIosIcon />
      </Button>
    </CardContent>
  </Card>
  );
}

function AudiobookCategory({ category, audiobooks }) {
  const classes = useStyles();
  const [swiper, setSwiper] = useState(null); // State to hold the Swiper instance

  const goNext = () => {
    swiper.slideNext();
  };

  const goPrev = () => {
    swiper.slidePrev(); 
  };
  return (
    <Box marginTop={10}>
    <Typography variant="h5" align="center" className={classes.categoryTitle}>
      {category}
    </Typography>
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      
      navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      onSwiper={(swiper) => setSwiper(swiper)} // Store the Swiper instance in state
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {audiobooks.map((audiobook) => (
        <SwiperSlide key={audiobook.id}>
          <AudiobookCard
           title={audiobook.title} 
           author={audiobook.author}
           imageUrl={audiobook.imageUrl}
           />
        </SwiperSlide>
      ))}
      <div style={{ fontSize: '5px' }}className={classes.arrowButton + ' swiper-button-next'}  onClick={goNext} ></div>
      <div style={{ fontSize: '5' }} className={classes.arrowButton + ' swiper-button-prev'} onClick={goPrev}></div>
    </Swiper>
  </Box>
  );
}

function AudiobookStore() {
  return (
    <div>
      <AudiobookCategory category="Best Sellers" audiobooks={audiobooks.bestSellers} />
      <AudiobookCategory category="Popular" audiobooks={audiobooks.popular} />
      <AudiobookCategory category="New Releases" audiobooks={audiobooks.newReleases} />
      <AudiobookCategory category="Coming Soon" audiobooks={audiobooks.comingSoon} />
    </div>
  );
}

export default AudiobookStore;
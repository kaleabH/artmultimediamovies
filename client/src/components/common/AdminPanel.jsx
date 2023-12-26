import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Stack, TextField, Typography, ModalOver } from '@mui/material';
import React, {useEffect, useState} from 'react'
import ReactDOM from "react-dom";
import Logo from './Logo';
import AddMedia from './AddMedia';
import mediaApi from '../../api/modules/media.api';
import {useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { matchPath } from 'react-router';

// import {styled,useTheme } from '@mui/material/styles';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from "r eact-redux";





function AdminPanel({actionText, openPanel, onPanelOpen}) {

  const [isRequestDone, setIsRequestDone] = useState(false);
  const [media, setMedia] = useState(false);
  const {mediaType, mediaId} = useParams()
  const navigate= useNavigate();

  const handleRemoval = async(message) =>{
    const confirm = window.confirm(message);

    if(confirm){ 
      setIsRequestDone(true);
      const { response, err } = await mediaApi.removeMedia(mediaType, mediaId, 0, 0);
      onPanelOpen(false);
      if(response)
      console.log("the response ", response);
      toast.success("media removed successfully ");
      navigate(`/${mediaType}`);
      console.log("the media type", mediaType);

      if(err)
      console.error("the error response ", err);
    }

    setIsRequestDone(false);
  } 

//   const theme = useTheme();


  const handlePanelOpen = ()=>{
    onPanelOpen(false);
  }
  const displayPanelContent = (actionText) =>{
    switch(actionText){
        case "add movie":
            return <AddMedia onPanelOpen={onPanelOpen} mediaType={"movie"}/>

        case "add series":
            return <AddMedia onPanelOpen={onPanelOpen} actionType={"addSeries"}  mediaType={"tv"}/>
            
        case "add audiobook":
            return <AddMedia mediaType={"audiobook"}/>

        case "remove movie":
             return <>
             <LoadingButton
        type="submit"
        fullWidth
        size="large"
        onClick={()=>{handleRemoval("are you sure you want to delete this movie")}}
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isRequestDone}
      >
        remove movie
      </LoadingButton>
             
             </>
          
        case "remove series":


        case "add episode":
            return <AddMedia onPanelOpen={onPanelOpen} actionType={"addEpisode"} selectedSeries={media} mediaType={"tv"}/>

        case "remove episode":
          break;

          default:
            return <h1>component</h1>
        
    }

  }
  
  useEffect(()=>{
    const getMedia = async () => {

      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });

      if (response) {
        setMedia(response);
      }

      if (err) toast.error(err.message);
    };

    getMedia();

    console.log("admin panel opened")
  
  },[mediaType, mediaId])


  return ReactDOM.createPortal(
    <div>
        <Modal open={openPanel} onClose={handlePanelOpen}>
        {/* <button onClick = {handlePanelOpen}>
            close panel
        </button> */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "700px",
        padding: 4,
        outline: "none",
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          <Box sx={{ textAlign: "center", marginBottom: "2rem"}}>
        <Typography textTransform="uppercase" fontSize={30} fontWeight={"bold"}>
              {actionText}
            </Typography>
            {displayPanelContent(actionText)}
            <Logo />
          </Box>

         
        </Box>
      </Box>
    </Modal>
    </div>,
  document.getElementById("adminPanel")
  )
}

export default AdminPanel
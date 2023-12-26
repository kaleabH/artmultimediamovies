import { useState, useEffect, useCallback} from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, Stack, TextField, Toolbar, Alert,LinearProgress,Typography, InputLabel } from "@mui/material";
import mediaApi from "../../api/modules/media.api";
import uiConfigs from "../../configs/ui.configs";
import MediaGrid from "./MediaGrid";
import { useLocation } from 'react-router-dom';
import MediaItem from "./MediaItem";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";


let timer;
const timeout = 500;

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{backgroundColor:"blue", width: '100%', mr: 1 }}>
        <LinearProgress  sx={{backgroundColor:"blue !important"}}{...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{color:"blue"}} color="text.secondary">{`${Math.round(props.value,)}%`}</Typography>
      </Box>
    </Box>
  );
}


function AddMedia(props) {

    const {onPanelOpen} = props;

    const [query, setQuery] = useState("");
    const [onSearch, setOnSearch] = useState(false);
    const [mediaType, setMediaType] = useState(props.mediaType);
    const [file, setFile] = useState();
    const [session, setSession] = useState(0);
    const [episode, setEpisode] = useState(0);
    // const [text, setText] = useState("");
    const [medias, setMedias] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState();
    const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

    const location = useLocation();
  
    const search = useCallback(
      async () => {
        setOnSearch(true);
  
        const { response, err } = await mediaApi.adminSearch({
          mediaType,
          query,
          page
        });
  
        setOnSearch(false);
  
        if (err) toast.error(err.message);
        if (response) {
          if (page > 1) setMedias(m => [...m, ...response.results]);
          else setMedias([...response.results]);
        }
      },
      [mediaType, query, page],
    );

    useEffect(()=>{

      setSelectedMedia(props.selectedSeries)

    },[props.selectedSeries])
  
    useEffect(() => {
      if (query.trim().length === 0) {
        setMedias([]);
        setPage(1);
      } else search();

    }, [search, query, mediaType, page]);
  
    useEffect(() => {
      setMedias([]);
      setPage(1);
      console.log("the selected media", selectedMedia)
    }, [mediaType, selectedMedia]);
  
  
    const onTextChangeSession = (e) => {
      setSession(e.target.value);
    }
    const onTextChangeEpisode = (e) => {
      setEpisode(e.target.value);
    }
    const onQueryChange = (e) => {
      const newQuery = e.target.value;
      clearTimeout(timer);
  
      timer = setTimeout(() => {
        setQuery(newQuery);
      }, timeout);
    };

    const handleChange = (e) => {
      setErrorMessage(null);

      setFile(e.target.files[0])
    }
    // const handleChangeText = (e) => {
    //   setText(e.target.value);
    // }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(null);
      const formData = new FormData();

      // console.log("the file", file.name);

      formData.append('mediaType', mediaType);
      formData.append('mediaId', selectedMedia.id);
      if(mediaType ==="movie")
      formData.append('mediaName', selectedMedia.original_title);
      else 
      formData.append('mediaName', selectedMedia.original_name);

      // if(mediaType === "movie" || mediaType === "tv"){
    
      //   formData.append('session', 0);
      //   formData.append('episode', 0);
      // }
      // else {
        formData.append('session', session);
        formData.append('episode', episode);
      // }
      formData.append('availableFor', "paid");
      formData.append('file', file);
      // formData.append('text', text);

      console.log("the addmedia", ...formData)
      const config = {onUploadProgress: function(progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      }}

      const { response, err } = await mediaApi.addMedia(formData,mediaType, config );

      if (err){
        setUploadProgress(0);
        setErrorMessage(err.message);
      }else{

        console.log("the media response", response);
        toast.success("media add successfully ");

        
        onPanelOpen(false);
      } 

    }
  
    return (
      <>
        <Toolbar />
      
    {selectedMedia ? (
      <>
    <div style={{justifyContent:"center",alignItems: "flex-start", display: "flex"}}>
      <div style={{width: "40%"}}>
      <Typography textTransform="uppercase" fontSize={30} fontWeight={"bold"}>
              {selectedMedia.title}
            </Typography>
      <MediaItem setSelectedMedia={setSelectedMedia} media={selectedMedia} mediaType={mediaType} />
      </div>
      <IconButton variant="contained" size="large" color="secondary" aria-label="add an alarm" onClick={()=>{setSelectedMedia(null)}}>
         <CloseIcon />
      </IconButton>
      </div>
      <Box sx={{justifyContent: "center"}} component="form" onSubmit={handleSubmit} >

{
  uploadProgress !== 100 && props.actionType !== "addSeries" &&
  (<>
  {
    props.actionType === 'addEpisode' && (
<>
 <InputLabel>session</InputLabel>
  <TextField
  color="success"
  placeholder="enter the session"
  name="session"
  value ={session}
  sx={{ width: "100%" }}
  autoFocus
  onChange={onTextChangeSession}
/>
<InputLabel>episode</InputLabel>
  <TextField
  name="episode"
  value ={episode}
  color="success"
  placeholder="enter the episode"
  sx={{ width: "100%" }}
  autoFocus
  onChange={onTextChangeEpisode}
/>
</>
    )
  }
            <TextField
              color="success"
              id="fileInput"
              placeholder="Search MoonFlix"
              sx={{ width: "100%" }}
              autoFocus
              type="file"
              name="file"
              onChange={handleChange}
            />
</>
  )
}
     {uploadProgress > 0 ?
     (
       <LinearProgressWithLabel value={uploadProgress} />
     )
     :
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
      >
         { mediaType ==="movie" ? "add movie" : mediaType === "tv" ? "add series" : "other media"}
      </LoadingButton>
     } 

    </Box>
    {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
      </>
      )
   :  
        <Box className="scrollable-content" sx={{ ...uiConfigs.style.mainContent, height:"600px", overflow:"scroll",overflowX: "hidden"}}>
          <Stack spacing={2}>
        
            <TextField
              color="success"
              placeholder="Search MoonFlix"
              sx={{ width: "100%" }}
              autoFocus
              onChange={onQueryChange}
            />
  
            <MediaGrid setSelectedMedia={setSelectedMedia}  medias={medias} mediaType={mediaType} />
  
            {medias.length > 0 && (
              <LoadingButton
                loading={onSearch}
                onClick={() => setPage(page + 1)}
              >
                load more
              </LoadingButton>
            )}
          </Stack>
        </Box>
  }
      </>
  )
}

export default AddMedia
import React, { useEffect, useState, useRef } from 'react'
// import { ReactVideo } from "reactjs-media";
import mediaApi from '../../api/modules/media.api';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import {Media, Video } from '@vidstack/player-react';
import { toast } from 'react-toastify';
import CanvasVideo from './canvasVideo/CanvasVideo';
import Hls from 'hls.js';

function VideoPlayer({media, mediaType, session, episode}) {
  const [posterPath, setPosterPath] = useState(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path));
  // const [video, setVideo] = useState("");
  const videoRef = useRef();
  useEffect(()=>{
    const video = videoRef;
        const videoSrc = 'http://localhost:5500/upload/frag_bunny/frag_bunny.m3u8';
            
            if (Hls.isSupported()) {
                const hls = new Hls(); 
                hls.loadSource(videoSrc);
                hls.attachMedia(video.current);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            console.log("inside the hls else if")
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }

  },[])
  


    // useEffect(()=>{
   
    //     setPosterPath(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path)) 
    //     console.log("the poster", media.poster_path )

    //     // getVideo()
    // },[])

  return (
    <div style={{alignSelf: "center", height: 700, width:"700px"}}>

{/* <CanvasVideo
     src={`http://localhost:5000/api/v1/${mediaType}/detail/${media.id}/${session}/${episode}`}
    options={{
        text: 'Art multimedia',
        poster: {posterPath},
        autoplay: false
    }}
    styles={{
        barContainer: {
        // backgroundColor: 'pink'
        }
    }}
/> */}
{/* <video controls></video> */}
<video id="video" width="500" height="500" controls ref={videoRef}></video>
    </div>
  )
}

export default VideoPlayer
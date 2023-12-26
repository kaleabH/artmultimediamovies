import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { useEffect, useState } from "react";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";

const RecommendSlide = ({ mediaType }) => {

  const [medias, setMedias] = useState();

  useEffect(()=>{
    const getMedias = async ()=>{
      const {response, err} = await mediaApi.getList({mediaType,mediaCategory:"top_rated",page: 1})


      if (err) toast.error(err.message);

      console.log("the response", response.results)
      
      setMedias(response.results);
      
    }


    getMedias()
  },[mediaType])
  return (
    <AutoSwiper>
      {/* {medias.map((media, index) => (
        <SwiperSlide key={index}>
        <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))} */}
    </AutoSwiper>
  );
};

export default RecommendSlide;
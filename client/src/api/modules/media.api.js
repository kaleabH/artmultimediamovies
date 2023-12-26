import privateClient from "../client/private.client";
import privateFormClient from "../client/privateMultipart.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
  adminSearch: ({ mediaType, query, page }) =>
    `${mediaType}/adminSearch?query=${query}&page=${page}`,
  add: (mediaType) => `${mediaType}`,
  remove: (mediaType, mediaId, session, episode) =>
    `${mediaType}/${mediaId}/${session}/${episode}`,
  video: (mediaType, mediaId, session, episode) =>
    `${mediaType}/detail/${mediaId}/${session}/${episode}`,
};

const mediaApi = {
  getVideo: async (mediaType, mediaId, session, episode) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.video(mediaType, mediaId, session, episode),
        { responseType: "arraybuffer" }
      );

      console.log("the video reponse", response);
      let blob = new Blob([response]);
      let url = URL.createObjectURL(blob);

      return { url };
    } catch (err) {
      return { err };
    }
  },
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );
      console.log("this the getList", response);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      console.log("the search result", response);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  adminSearch: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.adminSearch({ mediaType, query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  addMedia: async (media, mediaType, config) => {
    console.log("the addmedia", media);

    try {
      const response = await privateFormClient.post(
        mediaEndpoints.add(mediaType),
        media,
        config
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  removeMedia: async (mediaType, mediaId, session, episode) => {
    try {
      const response = await privateClient.delete(
        mediaEndpoints.remove(mediaType, mediaId, session, episode)
      );

      console.log("");

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;

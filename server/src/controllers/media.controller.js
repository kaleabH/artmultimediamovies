import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import mediaModel from "../models/media.model.js";
import multer from "multer";
import fs from "fs";

let fileName = "";

const getAdminSearchList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    console.log("this the getList function", response.results);

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
  console.log("inside getList");
};

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    const medias = await mediaModel.find(
      {
        $or: [
          ...response.results.map((result, index) => {
            return { mediaId: result.id.toString() };
          }),
        ],
        $and: [{ session: "0" }, { episode: "0" }],
      }
      // async function (err, docs) {
      //   try {
      //     if (!err) {
      //       medias = await docs;
      //       console.log("the filtered media", medias);
      //     }
      //   } catch (err) {
      //     console.log("error on the mongoose", err);
      //   }
      // }
    );

    // console.log(
    //   "the media filter query",
    //   ...response.results.map((result, index) => {
    //     return { mediaId: result.id.toString() };
    //   })
    // );

    console.log("the filtered media2", medias);
    console.log("the search results", ...response.results);

    let results = [];

    medias.forEach((media, index) => {
      results.push(
        ...response.results.filter(
          (result, index) => media.mediaId === result.id.toString()
        )
      );

      // return medias[index].mediaId === result.id.toString();
    });

    console.log("the filter results", results);
    const newResponse = { ...response, results };

    return responseHandler.ok(res, newResponse);
  } catch {
    responseHandler.error(res);
  }
  console.log("inside getList");
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    // let medias = null;

    const medias = await mediaModel.find(
      {
        $or: [
          ...response.results.map((result, index) => {
            return { mediaId: result.id.toString() };
          }),
        ],
        $and: [{ session: "0" }, { episode: "0" }],
      }
      // async function (err, docs) {
      //   try {
      //     if (!err) {
      //       medias = await docs;
      //       console.log("the filtered media", medias);
      //     }
      //   } catch (err) {
      //     console.log("error on the mongoose", err);
      //   }
      // }
    );

    // console.log(
    //   "the media filter query",
    //   ...response.results.map((result, index) => {
    //     return { mediaId: result.id.toString() };
    //   })
    // );

    console.log("the filtered media2", medias);
    console.log("the search results", ...response.results);

    let results = [];

    medias.forEach((media, index) => {
      results.push(
        ...response.results.filter(
          (result, index) => media.mediaId === result.id.toString()
        )
      );

      // return medias[index].mediaId === result.id.toString();
    });

    console.log("the filter results", results);
    const newResponse = { ...response, results };

    responseHandler.ok(res, newResponse);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./upload");
  },
  filename: function (request, file, callback) {
    var temp_file_arr = file.originalname.split(".");

    var temp_file_name = temp_file_arr[0];

    var temp_file_extension = temp_file_arr[1];
    fileName = temp_file_name + "-" + Date.now() + "." + temp_file_extension;

    callback(null, fileName);
  },
});

const uploads = multer({ storage: storage });

const getVideo = async (req, res) => {
  console.log("the get backend hit");
  const { mediaId, session, episode } = req.params;

  const media = await mediaModel.findOne({
    $and: [{ mediaId }, { session }, { episode }],
  });

  try {
    // Ensure there is a range given for the video
    const range = req.headers.range;
    console.log("the request headers", req.headers);
    console.log("the request params", req.params);
    console.log("the range of the request", range);
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    const videoPath = `upload/${media.url}`;
    const videoSize = fs.statSync(videoPath).size;
    console.log("the file path is", videoPath);
    console.log("the file size is", videoSize);

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    // const start = range;
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
      "Content-Disposition": "inline",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    console.log("the http status set to 206");

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    console.log("the start", start);
    console.log("the end", end);

    // Stream the video chunk to the client
    videoStream.pipe(res);
  } catch {
    responseHandler.error(res);
  }
};

const addMedia = async (req, res) => {
  console.log("inside controller");
  try {
    const { mediaType, mediaId, mediaName, session, episode, availableFor } =
      req.body;
    console.log("mediaController", req.body);

    const checkMedia = await mediaModel.findOne({
      $and: [{ mediaId }, { session }, { episode }],
    });

    if (mediaType !== "tv") console.log("filename", fileName);
    console.log("the media check", checkMedia);

    if (checkMedia)
      return responseHandler.badrequest(res, "media aleady exists");

    if (mediaType !== "tv") {
      if (!req.files[0])
        return responseHandler.badrequest(res, "video file is required");
    }

    console.log("after check");
    const media = new mediaModel();

    media.mediaId = mediaId;
    media.mediaType = mediaType;
    media.mediaName = mediaName;
    media.session = session;
    media.episode = episode;
    media.availableFor = availableFor;

    if (mediaType === "tv" && parseInt(session) === 0 && parseInt(episode) == 0)
      media.url = mediaName;
    else media.url = fileName;

    console.log("before save");
    await media.save((err) => {
      console.log("media Dbs error", err);
    });

    console.log("after save");
    responseHandler.created(res, {
      ...media,
    });
  } catch {
    responseHandler.error(res);
  }
};
const removeMedia = async (req, res) => {
  try {
    const { mediaType, mediaId, session, episode } = req.params;

    console.log("the remove params returned", req.params);
    // console.log(
    //   "stringified objects",
    //   { mediaType: mediaType.toString() },
    //   { mediaId: mediaId.toString() },
    //   { session: session.toString() },
    //   { episode: episode.toString() }
    // );

    const media = null;

    if (session.toString() > 0 || episode.toString() > 0) {
      media = await mediaModel.findOne({
        $and: [
          { mediaType: mediaType },
          { mediaId: mediaId },
          { session: session },
          { episode: episode },
        ],
      });
    } else {
      media = await mediaModel.findOne({
        $and: [
          { mediaType: mediaType },
          { mediaId: mediaId },
          // { session: session },
          // { episode: episode },
        ],
      });
    }

    console.log("the media", media);

    if (!media) return responseHandler.notfound(res);

    await media.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};
const adminSearch = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  getAdminSearchList,
  getList,
  getGenres,
  search,
  getDetail,
  addMedia,
  removeMedia,
  adminSearch,
  uploads,
  getVideo,
};

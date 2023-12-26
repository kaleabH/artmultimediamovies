import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const mediaSchema = new mongoose.Schema(
  {
    mediaId: {
      type: String,
      required: true,
      unique: false,
    },
    mediaName: {
      type: String,
    },
    mediaType: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    session: {
      type: String,
    },
    episode: {
      type: String,
    },
    availableFor: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

const mediaModel = mongoose.model("Media", mediaSchema);

export default mediaModel;

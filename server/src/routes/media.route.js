import express from "express";
import mediaController from "../controllers/media.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";
import { body } from "express-validator";
import multer from "multer";

const router = express.Router({ mergeParams: true });

router.get("/search", mediaController.search);

router.get("/adminSearch", mediaController.adminSearch);

router.get("/genres", mediaController.getGenres);

router.get("/detail/:mediaId", mediaController.getDetail);

router.get("/detail/:mediaId/:session/:episode", mediaController.getVideo);

router.get("/:mediaCategory", mediaController.getList);
router.post(
  "/",
  tokenMiddleware.auth,
  // (req, res, next) => {
  //   console.log("request recived and validated");
  //   next();
  // },
  requestHandler.validate,
  // body("files").exists().withMessage("video file is required"),
  // mediaController.uploads.array("file"),
  mediaController.uploads.any(),
  mediaController.addMedia
);

router.delete(
  "/:mediaId/:session/:episode",
  tokenMiddleware.auth,
  mediaController.removeMedia
);

export default router;

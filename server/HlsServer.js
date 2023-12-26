import express from "express";
// const app = require('express')();
import fs from "fs";
import HLSServer from "hls-server";
import http from "http";
import cors from "cors";
const app = express();
// const fs = require('fs');
// const hls = require('hls-server');
const hls = HLSServer;
import { fileURLToPath } from "url";
import { dirname } from "path";
import httpAttach from "http-attach";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.get("/", (req, res) => {});

// var corsOptions = {
//   origin: ["http://localhost:3000"],
//   // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors());
// app.use(function (req, res, next) {
//   console.log("this middleware is getting called");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
//   console.log(res);
// });
// "Access-Control-Allow-Origin": "http://localhost:3000"
var server = http.createServer();

function setCorsMiddleware(req, res, next) {
  console.log("this middleware got called");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
}

new hls(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split(".").pop();

      if (ext !== "m3u8" && ext !== "ts") {
        return cb(null, true);
      }

      fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
        console.log("the file directory", __dirname + req.url);
        if (err) {
          console.log("File not exist");
          return cb(null, false);
        }
        cb(null, true);
      });
    },
    getManifestStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
    },
    getSegmentStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
    },
  },
});

httpAttach(server, setCorsMiddleware);
server.listen(5500);

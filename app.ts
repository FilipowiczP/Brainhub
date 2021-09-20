import path from "path";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { eventController } from "./controllers/events";
import connectDB from "./data/connectDB";

const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

//    === START SERVER ===
(async function runServer() {
  try {
    const app = express();
    await connectDB();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(eventController);

    //  === FRONTEND ===
    app.use(express.static("build"));
    app.use("*", (req: Request, res: Response) => {
      return res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.log("Problems initializitng the app", err);
  }
})();

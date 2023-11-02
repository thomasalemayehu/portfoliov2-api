import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import coloredConsole from "cli-color";

//
import rateLimiter from "./config/rate.config";
//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// use middlewares
app.use(rateLimiter);
app.use(cors());
app.use(morgan("dev"));

//
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is live");
});

// launch server
app.listen(PORT, () => {
  console.log(
    coloredConsole.bgGreen.black.italic(` Sever is live at ${PORT} ...`)
  );
});

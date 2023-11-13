import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import coloredConsole from "cli-color";
import "express-async-errors";
//
import rateLimiter from "./config/rate.config";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import upload from "./config/multer.config";
//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

import errorMiddleware from "./middleware/error.middleware";
import routeNotFoundMiddleware from "./middleware/routeNotFound.middleware";
import filesProcessorMiddleware from "./middleware/fileProcessor.middleware";
// use middlewares
app.use(rateLimiter);
app.use(cors());
app.use(morgan("dev"));

//
app.use(express.static("./src/public"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.post(
  "/",
  (req: Request, res: Response) => {
    console.log(req.files);
    res.status(200).send({ message: "Server is live" });
  }
);

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.use(errorMiddleware);

app.use(routeNotFoundMiddleware);

// launch server
app.listen(PORT, () => {
  console.log(
    coloredConsole.bgGreen.black.italic(` Sever is live at ${PORT} ...`)
  );
});

export default app;

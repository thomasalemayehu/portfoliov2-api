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

//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

import errorMiddleware from "./middleware/error.middleware";
import routeNotFoundMiddleware from "./middleware/routeNotFound.middleware";
import filesProcessorMiddleware from "./middleware/fileProcessor.middleware";
import authenticationMiddleware from "./middleware/authentication.middleware";
import path from "path";
// use middlewares
app.use(rateLimiter);
app.use(cors());
app.use(morgan("dev"));

//
app.use(express.static("./src/public"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname,"../src/public/frontend/dist/index.html"))
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

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import meta from "./routes/meta";
import compression from "compression";
import express, { Application } from "express";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", meta);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

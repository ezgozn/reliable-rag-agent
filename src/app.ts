import express from "express";
import cors from "cors";

import health from "./routes/health.routes.js";
import documents from "./routes/documents.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/documents", documents);

app.use("/health", health);

app.use(errorHandler);

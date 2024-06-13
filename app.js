"use strict";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { csrf } from "./middleware/index.js";
import { router as v1 } from "./routes/index.js";
import { config } from "./config/index.js";
import { readENV } from "./helper/index.js";
readENV();

const corsOptions = {
  origin: [], //add cors 3rd party url that connectios or request to the api end point
  credentials: true,
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.disable("x-powered-by");

/** express raw
 * If sending video, images, file etc..
 */
app.use(express.raw({ type: "application/octet-stream" }));

/**
 * Content Security Policy
 * Only allowed on the same origin
 *
 */
app.use((_, res, next) => {
  res.setHeader("Content-Security-Policy", config["Content-Security-Policy"]);
  res.setHeader(
    "X-Content-Security-Policy",
    config["X-Content-Security-Policy"]
  );
  res.setHeader("Cache-Control", config["Cache-Control"]);
  res.setHeader("Referrer-Policy", config["Referrer-Policy"]);
  res.setHeader("X-Frame-Options", config["X-Frame-Options"]);
  res.setHeader("X-XSS-Protection", config["X-XSS-Protection"]);
  res.setHeader("X-Content-Type-Options", config["X-Content-Type-Options"]);
  res.setHeader(
    "Strict-Transport-Security",
    config["Strict-Transport-Security"]
  );
  next();
});

/*morgan */
app.use(morgan("dev"));

/*Cors*/
app.use(cors(corsOptions));

/*express body parser*/
app.use(express.urlencoded({ extended: true }));

/**Limit increate if needed */
app.use(
  express.json({
    limit: "50mb",
  })
);

/**
 * Public all the static assets
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * CSRF
 */
// app.use(csrf);

/**router */
app.use("/api", v1);

/**
 * MYSQL connction
 */
// mysqlConnection();

export default app;

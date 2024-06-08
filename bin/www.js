#!/usr/bin/node
"use strict";
import app from "../app.js";
import debug from "debug";
import http from "http";
import cluster from "cluster";
import os from "os";
import { config } from "../config/index.js";
import { normalizePort } from "../helper/index.js";

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
};

const numCPUs = os.cpus().length;

const port = normalizePort(config["PORT"]);

app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Listen on provided port, on all network interfaces.
 */
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("fork", (worker) => {
    console.log(`Worker ${worker.process.pid} is forked`);
  });

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("listening", (worker, address) => {
    console.log(
      `Worker ${worker.process.pid} is now connected to http://${
        address.address ? address.address : process.env.APP_HOST
      }:${address.port}`
    );
  });

  cluster.on("disconnect", (worker) => {
    console.log(`Worker ${worker.process.pid} has disconnected`);
  });

  cluster.on("error", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} has died with signal ${signal}`);
    cluster.fork();
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  server.listen(port, () => {
    console.log(
      `Server start running on http://${config["HOST"]}:${config["PORT"]}`
    );
  });
}

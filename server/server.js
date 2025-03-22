import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { expressOptions } from "./env.js";
import authRouter from "./router/auth.js";
import userRouter from "./router/user.js";

const server = express();

server.use(cookieParser(expressOptions.cookieSecret));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

server.use("/uploads", express.static(path.dirname(import.meta.url) + "/uploads"));

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);

server.get("/test", (req, res) => {
  res.status(200);
  res.send(JSON.stringify({ message: "test" }));
  res.end();
});

server.all("*", (req, res) => {
  res.status(404);
  res.send(JSON.stringify({ message: "Resource is not Found" }));
  res.end();
});

export default server;

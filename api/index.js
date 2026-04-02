import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { loadEnvFile } from "node:process";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

loadEnvFile();

// connect to mongodb database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MogoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

// allow server to accept json
app.use(express.json());
// can get info from cookie in req.cookies.access_token
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from api/index.js");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// middleware for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Express Server running on port ${port}!!!`);
});

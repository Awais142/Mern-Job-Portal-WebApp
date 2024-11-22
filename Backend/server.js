import express from "express";
import connectDB from "./config/DbConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import jobsRouter from "./routes/jobsRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: ["http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  return res.send("Hello from the Home page");
});

app.use("/api/user", userRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/app", applicationRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

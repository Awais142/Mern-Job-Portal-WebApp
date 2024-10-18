import express from "express";
import connectDB from "./config/DbConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import jobsRouter from "./routes/jobsRouter.js";

dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Hello from the Home page");
});

app.use("/api/user", userRouter);
app.use("/api/jobs", jobsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

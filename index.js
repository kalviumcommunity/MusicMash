import express from "express";
import mongoose from "mongoose";
import router from "./routes/auth/route.ts";
import cors from "cors";
import Authrouter from "./routes/auth/route.ts";
import Songrouter from "./routes/song/route.ts";
import Singerrouter from "./routes/singer/route.ts";
import { Song, Author } from "./model/index.ts";
const app = express();

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    if (db.connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
}
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

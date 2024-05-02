import express from "express";
import mongoose from "mongoose";
import router from "./routes/auth/route.js";
import cors from "cors";
import Authrouter from "./routes/auth/route.js";
import Songrouter from "./routes/song/route.js";
import Singerrouter from "./routes/singer/route.js";
import { Song, Author } from "./model/index.js";
const app = express();
async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
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
app.use("/user", Authrouter);
app.use("/song", Songrouter);
app.use("/", Singerrouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

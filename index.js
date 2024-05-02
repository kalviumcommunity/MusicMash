import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use("/ping", (req,res) =>{
  res.send('ping')
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

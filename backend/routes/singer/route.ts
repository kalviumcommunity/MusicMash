import express from "express";
import { Author } from "../../model";

const Singerrouter = express.Router();

Singerrouter.get("/singers", async (req, res) => {
  const user = await Author.find();
  return res.json(user);
});

export default Singerrouter;

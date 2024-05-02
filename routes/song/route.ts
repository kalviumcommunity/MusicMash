import express from "express";
import { Author, Song } from "../../model";

const Songrouter = express.Router();

Songrouter.get("/songs", async (req, res) => {
  const songs = await Song.find();
  return res.json({ songs });
});

Songrouter.get("/songs/:id", async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  return res.json(song);
});

Songrouter.post("/create", async (req, res) => {
  const { song, artist, genre, image } = await req.body;
  if (!song || !artist || !genre || !image) {
    return res.status(400).json({ message: "missing" });
  }
  const songs = await Song.create({
    artist,
    song,
    genre,
    image,
  });
  let artists = await Author.findOne({ artist: artist });
  if (!artists) {
    artists = await Author.create({
      artist: artist,
      songs: [songs.id],
    });
  }

  if (!songs) {
    return res.status(500).json({ message: "error" });
  }
  return res.status(200).json({ message: "success" });
});

Songrouter.put("/:id", async (req, res) => {
  const { id } = await req.params;
  const { song, artist, genre, image } = await req.body;
  const songs = await Song.findByIdAndUpdate(id, {
    ...req.body,
  });
  return res.json({ message: "ok" });
});

Songrouter.delete("/:id", async (req, res) => {
  const { id } = await req.params;
  const songs = await Song.findByIdAndDelete(id);
  return res.json({ message: "ok" });
});
export default Songrouter;

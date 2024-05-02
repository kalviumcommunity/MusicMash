import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true , 
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

const song = new mongoose.Schema({
  song: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
    ref: "Artist",
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const author = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
    // unique: true,
  },
  songs: {
    ref: "Song",
    type: Array,
    required: true,
    // unique: true,
  },
});
export const User = mongoose.model("User", userSchema);
export const Song = mongoose.model("Song", song);
export const Author = mongoose.model("Author", author);

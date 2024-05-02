import express, { response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../model";

const Authrouter = express.Router();

Authrouter.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = await req.body;
    const userv = await User.findOne({ username });
    if (userv) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const passwords = await bcryptjs.hash(password, salt);
    const user = await User.create({ username, password: passwords, email });
    return res.json(user);
  } catch (err: any) {
    console.log(err);
  }
});

Authrouter.post("/signin", async (req, res) => {
  const { username, password } = await req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "User not exists" });
  }
  const passwords = await bcryptjs.compare(password, user.password);
  if (!passwords) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const tokenData = {
    email: user.email,
    username: user.username,
  };
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "1hr",
  });
  res.cookie("token", token, { httpOnly: true });
  return res.json({ token, user });
});

const verify = (req) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    throw new Error("Authorization header missing or invalid");
  }
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, process.env.TOKEN_SECRET!);
  return verify.email;
};
Authrouter.get("/", async (req, res) => {
  const token = await verify(req);
  return res.json({
    success: true,
    token: token,
  });
});
Authrouter.get("/logout", async (req, res) => {
  const responses = response.json({
    message: "logout successfully",
  });
  responses.clearCookie("token");
  return responses;
});

export default Authrouter;

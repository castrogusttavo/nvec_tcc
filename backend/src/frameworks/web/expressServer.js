// src/frameworks/web/express-server.js

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
require('dotenv').config();

dotenv.config({ path: './src/.env' });

const registerUser = require("../../usecases/registerUser");
const loginUser = require("../../usecases/loginUser");
const UserRepository = require("../../interfaces/repositories/userRepository");

const app = express();
const secretKey = process.env.JWT_SECRET_KEY;

console.log("Secret Key:", secretKey);

if (!secretKey) {
  throw new Error("Secret Key is not defined. Check your .env configuration.");
}

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const newUser = await registerUser(UserRepository, req.body, bcrypt);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(UserRepository, secretKey, bcrypt, req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

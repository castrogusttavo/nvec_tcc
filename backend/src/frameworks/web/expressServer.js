// src/frameworks/web/express-server.js

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const registerUser = require('../../usecases/registerUser');
const loginUser = require('../../usecases/loginUser');
const UserRepository = require('../../interfaces/repositories/userRepository');
const db = require('../../frameworks/persistance/mysql');
// const { create } = require('domain');

const app = express();
const secretKey = process.env.JWT_SECRET_KEY;

const db = createConnection();
const userRepository = new UserRepository(db);

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const newUser = await registerUser(userRepository, req.body, bcrypt);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get('/login', async (req, res) => {
  try {
    const token = await loginUser(userRepository, secretKey, bcrypt, req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

module.exports = function (secretKey) {
  function verifyToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Token de autorização não fornecido." });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
      }
      req.userId = decoded.userId;
      req.userEmail = decoded.userEmail;
      next();
    });
  }

  // Cache object
  const cache = {};

  // Validation Internet Connection
  router.get("/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  // Store Data in Cache
  router.post("/cache", (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
      return res.status(400).json({ message: "Key and value are required" });
    }

    cache[key] = value;
    res.json({ message: "Data cached successfully" });
  });

  // Retrieve Data from Cache
  router.get("/cache/:key", (req, res) => {
    const key = req.params.key;

    if (!cache[key]) {
      return res.status(404).json({ message: "Data not found in cache" });
    }

    res.json({ key: key, value: cache[key] });
  });

  router.post("/clear-cache", (req, res) => {
    for (let key in cache) {
      delete cache[key];
    }
    res
      .clearCookie("token")
      .json({ message: "Sessão encerrada e cache limpo com sucesso" });
  });

  // Clean Cache
  router.delete("/cache/:key", (req, res) => {
    const key = req.params.key;

    if (cache[key]) {
      delete cache[key];
      return res.json({ message: "Cache cleared successfully" });
    }

    res.status(404).json({ message: "Key not found in cache" });
  });

  return router;
};

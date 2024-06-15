const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let cache = {};

module.exports = function (secretKey) {
  function verifyToken(req, res, next) {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token de autorização não fornecido." });
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

  // Create cache
  router.get("/cache", verifyToken, (req, res) => {
    try {
      const decodedToken = req.decodedToken;

      const data = {
        userId: decodedToken.userId,
        userEmail: decodedToken.userEmail,
        userName: decodedToken.userName,
      };

      cache = data;

      res.status(200).json({ message: "Dados carregados e cacheados com sucesso", cache });
    } catch (err) {
      console.error("Erro ao carregar e cachear dados:", error);
      res.status(500).json({ error: "Erro ao carregar e cachear dados" });
    }
  });

  // Clear cache
  router.get("/clearCache", verifyToken, (req, res) => {
    cache = {};

    res.status(200).json({ message: "Cache limpo com sucesso" });
    res.clearCookie("token").json({ message: "Sessão encerrada com sucesso" });
  });

  return router;
};

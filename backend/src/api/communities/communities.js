const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

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

  // New Community
  router.post("/communities", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  // Get All Communities
  router.get("/communities", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  // Get Community by ID
  router.get("/communities/:id", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  // Alter All Data of Community
    router.post("/communities", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  // Alter Specific Data of Community
    router.post("/communities", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  // Delete Community by ID
    router.post("/communities", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  return router;
}
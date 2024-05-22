const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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
      req.userName = decoded.userName;
      next();
    });
  }

  // New List
  router.post("/lists", verifyToken, async (req, res) => {
    try {
      const {
        nome_lista,
        descricao_lista,
        renda_lista,
        valor_gasto,
        id_categoria,
      } = req.body;
      const userId = req.userId;
      const dataAtual = new Date().toISOString().slice(0, 10);

      const result = await db_query(
        "INSERT INTO tb_lista (nm_lista, dt_criacao, ds_lista, rd_lista, vl_gasto, id_categoria, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          nome_lista,
          dataAtual,
          descricao_lista,
          renda_lista,
          valor_gasto,
          id_categoria,
          userId,
        ]
      );

      res.status(201).json({
        message: "Lista criada com sucesso.",
        id_lista: result.insertId,
      });
    } catch (err) {
      console.error("Erro ao criar lista", err);
      res.status(500).send("Erro ao criar uma nova lista");
    }
  });

  // Get All Lists
  router.get("/lists", verifyToken, async (req, res) => {
    try {
      const userId = req.userId;

      const lists = await db_query(
        "SELECT * FROM tb_lista WHERE id_usuario = ?",
        [userId]
      );

      res.json(lists);
    } catch (err) {
      console.error("Erro ao buscar listas:", err);
      res.status(500).send("Erro ao buscar listas");
    }
  });

  // Get List by ID
  router.get("/lists/:id", async (req, res) => {
    try {
      const listId = req.params.id;
      const userId = req.userId;

      const list = await db_query(
        "SELECT * FROM tb_lista WHERE id_lista = ? AND id_usuario = ?",
        [listId, userId]
      );

      if (list.length === 0) {
        res.status(404).send("Lista não encontrada");
        return;
      }

      res.json(list[0]);
    } catch (err) {
      console.error("Erro ao buscar lista:", err);
      res.status(500).send("Erro ao buscar lista");
    }
  });

  // Get Recent Lists
  router.get("/recentLists", async (req, res) => {
    try {
      const listId = req.params.id;
      const userId = req.userId;

      const recentLists = await db_query(
        "SELECT * FROM tb_lista WHERE id_usuario = ? ORDER BY dt_criacao DESC LIMIT 4",
        [userId]
      );

      res.status(200).json(recentLists);
    } catch (err) {
      console.error("Erro ao buscar listas recentes:", err);
      res.status(500).send("Erro ao buscar listas recentes");
    }
  });

  // Alter All Data of List
  router.put("lists/:id", async (req, res) => {
    try {
      const listId = req.params.id;
      const userId = req.userId;
      const {
        nome_lista,
        descricao_lista,
        renda_lista,
        valor_gasto,
        id_categoria,
      } = req.body;

      await db_query(
        "UPDATE tb_lista SET nm_lista = ?, ds_lista = ?, rd_lista = ?, vl_gasto = ?, id_categoria = ? WHERE id_lista = ? AND id_usuario = ?",
        [
          nome_lista,
          descricao_lista,
          renda_lista,
          valor_gasto,
          id_categoria,
          listId,
          userId,
        ]
      );

      res.sendStatus(200).json({ message: "Lista atualizada com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar lista:", err);
      res.status(500).send("Erro ao atualizar lista");
    }
  });

  // Alter Specific Data of List
  router.patch("lists/:id", async (req, res) => {
    try {
      const listId = req.params.id;
      const userId = req.userId;
      const updateFields = req.body;

      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);

      const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");

      await db_query(
        `UPDATE tb_lista SET ${setQuery} WHERE id_lista = ? AND id_usuario = ?`,
        [...values, listId, userId]
      );

      res.sendStatus(200).json({ message: "Lista atualizada com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar parcialmente a lista", err);
      res.sendStatus(500).send("Erro ao atualizar parcialmente a lista");
    }
  });

  // Delete List
  router.patch("lists/:id", async (req, res) => {
    try {
      const listId = req.params.id;
      const userId = req.userId;

      await db_query(
        "DELETE FROM tb_lista WHERE id_lista = ? AND id_usuario = ?",
        [listId, userId]
      );

      res.sendStatus(200).json({ message: "Lista deletada com sucesso." });
    } catch (err) {
      console.error("Erro ao deletar lista", err);
      res.sendStatus(500).send("Erro ao deletar lista");
    }
  });

  return router;
};

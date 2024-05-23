const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

  // New Community
  router.post("/communities/:id", async (req, res) => {
    try {
      const { nome_comunidade, sobre_comunidade, id_categoria } = req.body;

      if (!nome_comunidade || !sobre_comunidade || !id_categoria) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
      }

      const comunidades = await db_query(
        "INSERT INTO tb_comunidade (nm_comunidade, ds_comunidade, id_categoria) VALUES (?, ?, ?)",
        [nome_comunidade, sobre_comunidade, id_categoria]
      );

      res
        .status(200)
        .json({
          message: "Comunidade criada com sucesso.",
          id_comunidade: comunidades.insertId,
        });
    } catch (err) {
      console.error("Erro ao criar comunidade:", err);
      res.status(500).send("Erro ao criar comunidade.");
    }
  });

  // Get All Communities
  router.get("/communities", async (req, res) => {
    try {
      const comunidades = await db_query("SELECT * FROM tb_comunidade");

      res.status(200).json(comunidades);
    } catch (err) {
      console.error("Erro ao buscar comunidades:", err);
      res.status(500).send("Erro ao buscar comunidades.");
    }
  });

  // Get Community by ID
  router.get("/communities/:id", async (req, res) => {
    try {
      const comunidadeId = req.params.id;

      const comunidade = await db_query(
        "SELECT * FROM tb_comunidade WHERE id_comunidade = ?",
        [comunidadeId]
      );

      if (comunidade.length === 0) {
        return res.status(404).json({ error: "Comunidade não encontrada." });
      }

      res.status(200).json(comunidade[0]);
    } catch (err) {
      console.error("Erro ao buscar comunidade:", err);
      res.status(500).send("Erro ao buscar comunidade.");
    }
  });

  // Alter All Data of Community
  router.put("/communities/:id", async (req, res) => {
    try {
      const comunidadeId = req.params.id;
      const { nome_comunidade, sobre_comunidade, id_categoria } = req.body;

      if (!nome_comunidade || !sobre_comunidade || !id_categoria) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
      }

      const result = await db_query(
        "UPDATE tb_comunidade SET nm_comunidade = ?, ds_comunidade = ?, id_categoria = ? WHERE id_comunidade = ?",
        [nome_comunidade, sobre_comunidade, id_categoria, comunidadeId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comunidade não encontrada." });
      }

      res.status(200).json({ message: "Comunidade alterada com sucesso." });
    } catch (err) {
      console.error("Erro ao alterar comunidade:", err);
      res.status(500).send("Erro ao alterar comunidade.");
    }
  });

  // Alter Specific Data of Community
  router.patch("/communities/:id", async (req, res) => {
    try {
      const comunidadeId = req.params.id;
      const updateFields = req.body;

      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);

      const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");

      const result = await db_query(
        `UPDATE tb_comunidade SET ${setQuery} WHERE id_comunidade = ?`,
        [...values, comunidadeId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comunidade não encontrada." });
      }

      res.status(200).json({ message: "Comunidade alterada com sucesso." });
    } catch (err) {
      console.error("Erro ao alterar parcialmente a comunidade", err);
      res.status(500).send("Erro ao alterar parcialmente a comunidade.");
    }
  });

  // Delete Community by ID
  router.delete("/communities/:id", async (req, res) => {
    try {
      const comunidadeId = req.params.id;

      const result = await db_query(
        "DELETE FROM tb_comunidade WHERE id_comunidade = ?",
        [comunidadeId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comunidade não encontrada." });
      }

      res.status(200).json({ message: "Comunidade deletada com sucesso." });
    } catch (err) {
      console.error("Erro ao deletar comunidade:", err);
      res.status(500).send("Erro ao deletar comunidade.");
    }
  });

  module.exports = router;
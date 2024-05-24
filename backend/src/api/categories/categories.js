const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

  router.post("/categories/:id", async (req, res) => {
    try {
      const {ds_categoria } = req.body;

      if (!ds_categoria) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
      }

      const categorias = await db_query(
        "INSERT INTO tb_categoria (ds_categoria) VALUES (?, ?, ?)",
        [ds_categoria]
      );

      res
        .status(200)
        .json({
          message: "Categoria criada com sucesso.",
          id_categoria: categorias.insertId,
        });
    } catch (err) {
      console.error("Erro ao criar categoria:", err);
      res.status(500).send("Erro ao criar categoria.");
    }
  });

  router.get("/categories", async (req, res) => {
    try {
      const categorias = await db_query("SELECT * FROM tb_categoria");

      res.status(200).json(categorias);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
      res.status(500).send("Erro ao buscar categorias.");
    }
  });

  router.get("/categories/:id", async (req, res) => {
    try {
      const categoriaId = req.params.id;

      const categoria = await db_query(
        "SELECT * FROM tb_categoria WHERE id_categoria = ?",
        [categoriaId]
      );

      if (categoria.length === 0) {
        return res.status(404).json({ error: "categoria não encontrada." });
      }

      res.status(200).json(categoria[0]);
    } catch (err) {
      console.error("Erro ao buscar categoria:", err);
      res.status(500).send("Erro ao buscar categoria.");
    }
  });
  router.put("/categories/:id", async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const { ds_categoria } = req.body;

      if (ds_categoria) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
      }

      const result = await db_query(
        "UPDATE tb_categoria SET ds_categoria = ? WHERE id_categoria = ?",
        [ds_categoria, categoriaId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "categoria não encontrada." });
      }

      res.status(200).json({ message: "categoria alterada com sucesso." });
    } catch (err) {
      console.error("Erro ao alterar categoria:", err);
      res.status(500).send("Erro ao alterar categoria.");
    }
  });

  router.patch("/categories/:id", async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const updateFields = req.body;

      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);

      const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");

      const result = await db_query(
        `UPDATE tb_categoria SET ${setQuery} WHERE id_categoria = ?`,
        [...values, categoriaId]
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

  router.delete("/categories/:id", async (req, res) => {
    try {
      const categoriaId = req.params.id;

      const result = await db_query(
        "DELETE FROM tb_categoria WHERE id_categoria = ?",
        [categoriaId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "categoria não encontrada." });
      }

      res.status(200).json({ message: "categoria deletada com sucesso." });
    } catch (err) {
      console.error("Erro ao deletar categoria:", err);
      res.status(500).send("Erro ao deletar categoria.");
    }
  });

  module.exports = router;
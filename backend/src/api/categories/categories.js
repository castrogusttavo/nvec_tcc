const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/categories", async (req, res) => {
  try {
    const { ds_categoria } = req.body;

    const result = await db_query(
      "INSERT INTO tb_categoria (ds_categoria) VALUES (?) RETURNING *",
      [ds_categoria]
    );

    res.status(201).json({ id_categoria: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir categoria", err);
    res.status(500).send("Erro ao inserir categoria");
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await db_query("SELECT * FROM tb_categoria");

    res.json(categories);
  } catch (err) {
    console.error("Erro ao buscar categories categories", err);
    res.status(500).send("Erro ao buscar categories categories");
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const categories = req.params.id;

    const categoriasList = await db_query(
      "SELECT * FROM tb_categoria WHERE id_categoria = ?",
      [categories]
    );

    if (categoriasList.length === 0) {
      res.status(404).send("categories categories não encontrada");
      return;
    }

    res.json(categoriasList[0]);
  } catch (err) {
    console.error("Erro ao buscar categoria", err);
    res.status(500).send("Erro ao buscar categoria");
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    const categories = req.params.id;
    const {ds_categoria } = req.body;

    await db_query(
      "UPDATE tb_categoria SET ds_categoria = ? WHERE id_categoria = ?",
      [ds_categoria, categories]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar categoria", err);
    res.status(500).send("Erro ao atualizar categoria");
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const categories = req.params.id;

    await db_query("DELETE FROM tb_categoria WHERE id_categoria = ?", [categories]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar categoria", err);
    res.status(500).send("Erro ao deletar categoria");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/income", async (req, res) => {
  try {
    const { vl_renda, id_usuario } = req.body;

    const result = await db_query(
      "INSERT INTO tb_renda (vl_renda, id_usuario) VALUES (?, ?) RETURNING *",
      [vl_renda, id_usuario]
    );

    res.status(201).json({ id_renda: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir renda", err);
    res.sendStatus(500).send("Erro ao inserir renda");
  }
});

router.get("/income", async (req, res) => {
  try {
    const rendas = await db_query("SELECT * FROM tb_renda");

    res.json(rendas);
  } catch (err) {
    console.error("Erro ao buscar rendas", err);
    res.sendStatus(500).send("Erro ao buscar rendas");
  }
});

router.get("/income/:id", async (req, res) => {
  try {
    const rendasId = req.params.id;

    const rendas = await db_query(
      "SELECT * FROM tb_renda WHERE id_renda = ?",
      [rendasId]
    );

    if (rendas.length === 0) {
      res.status(404).send("Renda não encontrada");
      return;
    }

    res.json(rendas[0]);
  } catch (err) {
    console.error("Erro ao buscar renda", err);
    res.sendStatus(500).send("Erro ao buscar renda");
  }
});

router.put("/income/:id", async (req, res) => {
  try {
    const rendaId = req.params.id;
    const { vl_renda, id_usuario } = req.body;

    await db_query(
      "UPDATE tb_renda SET vl_renda = ?, id_usuario = ? WHERE id_renda = ?",
      [vl_renda, id_usuario, rendaId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar renda", err);
    res.sendStatus(500).send("Erro ao atualizar renda");
  }
});

router.delete("/income/:id", async (req, res) => {
  try {
    const rendaId = req.params.id;

    await db_query("DELETE FROM tb_renda WHERE id_renda = ?", [rendaId]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar renda", err);
    res.sendStatus(500).send("Erro ao deletar renda");
  }
});

module.exports = router;